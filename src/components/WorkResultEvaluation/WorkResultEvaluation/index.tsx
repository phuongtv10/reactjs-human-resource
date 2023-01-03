import React, { useState } from 'react';
import { Space, Table, Tag, Button, DatePicker, Select, Breadcrumb, Modal, Form, Input, InputNumber, Col, Row } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './Style.module.scss';
import { Card } from 'antd';
import { SearchOutlined, PlusOutlined, FormOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetAllEvaluationFormsQuery } from '../../../api/evaluation.api';
const Search = Input.Search;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

interface DataType {
}
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
        <button className={`${styles.addCircle} ${styles.antBtnCircle}`}> 
          <FormOutlined className={styles.addIcon}/>
        </button>
        <button className={`${styles.updateCircle} ${styles.antBtnCircle}`}> 
        <EditOutlined className={styles.updateIcon}/>
        </button>
        <button className={`${styles.deleteCircle} ${styles.antBtnCircle}`}> 
        <DeleteOutlined className={styles.deleteIcon}/>
        </button>
      </Space>
    ),
  },
];

const onChange = (value: string) => {
};

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

  const {data} = useGetAllEvaluationFormsQuery();
  const evaluationData = data?.responseData
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values: any) => {
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
        <div className={styles.btnAction}>
          <Space wrap>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal} danger>
              Thêm mới
            </Button>
            <Modal title="Thêm mới ngày công" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'Lưu'} cancelText={'Hủy'} width={750}>
              <div>
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                  <Row>
                    <Col span={12}>
                      <Form.Item name={['user', 'namePrj']} label="Tên dự án" rules={[{ required: true }]}>
                        <Input placeholder="Tên dự án" style={{ width: 200 }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name={['user', 'manage']} label="Người quản lý">
                        <Input placeholder="Người quản lý" style={{ width: 200 }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item name={['user', 'date']} label="Ngày">
                        <DatePicker />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name={['user', 'cong']} label="Loại cộng">
                        <Select
                          style={{ width: 200 }}
                          showSearch
                          placeholder="Select a person"
                          optionFilterProp="children"
                          onChange={onChange}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                          }
                          options={[
                            {
                              value: 'jack',
                              label: 'Jack',
                            },
                            {
                              value: 'lucy',
                              label: 'Lucy',
                            },
                            {
                              value: 'tom',
                              label: 'Tom',
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item name={['user', 'hour']} label="Số giờ công">
                        <InputNumber min={1} max={10} defaultValue={1} style={{ width: 200 }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name={['user', 'hour']} label="Công điều chỉnh">
                        <Input placeholder="Basic usage" style={{ width: 200 }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item name={['user', 'note']} label="Ghi chú">
                        <Input.TextArea />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Modal>
          </Space>
        </div>
      </Card>
      {evaluationData && evaluationData.length > 0 && <Table columns={columns} dataSource={evaluationData} className={styles.tableMain} style={{ textAlign: 'right' }} />}
    </div>
  </div>
}

export default WorkResultEvaluation
