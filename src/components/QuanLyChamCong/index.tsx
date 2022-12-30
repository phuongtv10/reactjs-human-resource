import React, { useState } from 'react';
import { Space, Table, Tag, Button, DatePicker, Select, Breadcrumb, Modal, Form, Input, InputNumber, Col, Row } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './Hoso.module.scss';
import { Card } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const columns: ColumnsType<DataType> = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Tên dự án',
    dataIndex: 'duan',
    key: 'duan',
  },
  {
    title: 'Người quản lý',
    dataIndex: 'nguoiQuanLy',
    key: 'nguoiQuanLy',
  },
  {
    title: 'Ngày',
    key: 'date',
    dataIndex: 'date'
  },
  {
    title: 'Số giờ công',
    dataIndex: '',
    key: '',
  },
  {
    title: 'Loại công',
    dataIndex: '',
    key: '',
  },
  {
    title: 'Công điều chỉnh',
    dataIndex: '',
    key: '',
  },
  {
    title: 'Ghi chú',
    dataIndex: '',
    key: '',
  },
  {
    title: 'Trạng thái',
    dataIndex: '',
    key: '',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Ngày duyệt',
    dataIndex: '',
    key: '',
  },
  {
    title: 'Ngày Duyệt Điều Chỉnh',
    dataIndex: '',
    key: '',
  },
  {
    title: 'Hành động',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['DEV'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['DEV'],
  }
];

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onChangeDate = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};

const { RangePicker } = DatePicker;

const validateMessages = {
  required: '${label} bắt buộc',
  types: {
    number: '${label} phải là kiểu số',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const Hoso = () => {
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
    console.log(values);
  };
  const onChangeNum = (value: number) => {
    console.log('changed', value);
  };

  return <div className={styles.main}>
    <div className={styles.header}>
      <Breadcrumb className={styles.header}>
        <Breadcrumb.Item>
          <a href="">Trang chủ
          </a>
          </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Quản lý chấm công
          </a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <h2 className={styles.header}>Quản lý chấm công</h2>
    </div>
    <div>
      <Card className={styles.cardTitle}>
        <div className={styles.btnAction}>
          <Space wrap>
            <div>
              <b>Trạng thái: </b>
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                style={{ width: 160 }}
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  {
                    value: 'dangCd',
                    label: 'Đang chờ duyệt',
                  },
                  {
                    value: 'daDuyet',
                    label: 'Đã duyệt',
                  },
                  {
                    value: 'daCc',
                    label: 'Đã chốt công',
                  },
                  {
                    value: 'dieuChinh',
                    label: 'Điều chỉnh',
                  },
                  {
                    value: 'đauyetDc',
                    label: 'Đã duyệt điều chỉnh',
                  },
                  {
                    value: 'daChotDc',
                    label: 'Đã chốt điều chỉnh',
                  },
                  {
                    value: 'tuChoiCc',
                    label: 'Từ chối chốt công',
                  },
                  {
                    value: 'huyDc',
                    label: 'Hủy điều chỉnh',
                  }
                ]}
              />
            </div>
            <div>
              <b>Từ ngày: </b>
              <RangePicker />
            </div>
            <Button type="primary" icon={<SearchOutlined />} danger>
              Tìm kiếm
            </Button>
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
      <Table columns={columns} dataSource={data} className={styles.tableMain} />
    </div>
  </div>
}

export default Hoso
