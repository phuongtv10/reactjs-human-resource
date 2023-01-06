import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Space, Table, Tag, Button, DatePicker, Select, Breadcrumb, Modal, Form, Input, InputNumber, Col, Row, FormInstance } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './Style.module.scss';
import { Card } from 'antd';
import { SearchOutlined, PlusOutlined, FormOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useCreatePostMutation, useDeletePostMutation, useGetAllEvaluationFormsQuery } from '../../../api/evaluation.api';
import ResultForm from './ResultForm';
const Search = Input.Search;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const { confirm } = Modal;
interface DataType {
}

const onNotify = () => {
  confirm({
    title: 'Do you want to delete these items?',
    content:
      'When clicked the OK button, this dialog will be closed after 1 second',
    async onOk() {
      try {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        });
      } catch (e) {
        return console.log('Oops errors!');
      }
    },
    onCancel() { },
  });
}

const onSearch = (value: string) => {
};

const validateMessages = {
  required: '${label} bắt buộc',
  types: {
    number: '${label} phải là kiểu số',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const WorkResultEvaluation = () => {

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '5%',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      width: '30%',
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '35%',
      render: (_, record) => (
        <Space size="middle">
          <Button className={`${styles.addCircle} ${styles.antBtnCircle}`}>
            <FormOutlined className={styles.addIcon} />
          </Button>
          <Button className={`${styles.updateCircle} ${styles.antBtnCircle}`} onClick={() => {
            onUpdate(record);
          }}>
            <EditOutlined className={styles.updateIcon} />
          </Button>
          <Button className={`${styles.deleteCircle} ${styles.antBtnCircle}`} onClick={() => {
            onDelete(record);
          }}>
            <DeleteOutlined className={styles.deleteIcon} />
          </Button>
        </Space>
      ),
    },
  ];
  const { data } = useGetAllEvaluationFormsQuery();
  const evaluationData = data?.responseData
  const [item, setItem] = useState('');
  const [visible, setVisible] = useState(false);

  // send sample evaluation data via API
  const [form] = Form.useForm();
  const evaluatedSampleForm = Form.useWatch('evaluatedSample', form);
  const evaluatedCriteriaForm = Form.useWatch('evaluatedCriteria', form);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createPost, { isLoading, isError, error, isSuccess }] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();

  useEffect(() => {
    if (isSuccess) {
      setVisible(false);
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) => (console.log(el)
        ))
      } else {
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onUpdate = (record: any) => {
    setItem(record);
    setVisible(true);
  }

  const onDelete = (record: any) => {
    confirm({
      title: 'Thông báo',
      content: 'Bạn có chắc chắn muốn xóa bản ghi này?',
      cancelText:'Hủy',
      async onOk() {
        try {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            deletePost(record?.id)
          });
        } catch (e) {
          return e;
        }
      },
      onCancel() { },
    });
  }

  const handleCreate = (props: any) => {
    if (props) {
      props.validateFields().then(async (values: any, error: any) => {
        if (values) {
          console.log("Received values of form: ", values);
          const newData = {
            "evaluationFormDetailDTOList": [
              {
                "id": "",
                "criteriaSuper": values.evaluatedCriteria.criteriaSuper,
                "percent": Number(values.evaluatedCriteria.percent)
              }
            ],
            "evaluationFormDTO": {
              "id": null,
              "name": values.evaluatedSample.name,
              "type": values.evaluatedSample.type
            }
          }
          createPost(newData);
        }
        props.resetFields();
        await setVisible(false);
      });
    }
  };

  return <div className={styles.main}>
    <div className={styles.header}>
      <Breadcrumb className={styles.header}>
        <Breadcrumb.Item>
          <a href="">Trang chủ
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Quản lý mẫu đánh giá kết quả công việc
          </a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <h2 className={styles.header}>Mẫu đánh giá hiệu quả công việc</h2>
    </div>
    <div>
      <Card className={styles.cardTitle}>
        <Search
          placeholder="Tìm kiếm mẫu đánh giá"
          onSearch={value => console.log(value)}
          className={styles.search}
        />
        <Button className={styles.searchBtn} type="primary" icon={<PlusOutlined />} onClick={() => setVisible(true)} danger>
          Thêm mới
        </Button>
      </Card>
      {evaluationData && evaluationData.length > 0 && <Table columns={columns} dataSource={evaluationData} className={styles.tableMain} />}
      <ResultForm
        visible={visible}
        item={item}
        onCancel={() => setVisible(false)}
        onCreate={handleCreate} />
    </div>
  </div>
}

export default WorkResultEvaluation

