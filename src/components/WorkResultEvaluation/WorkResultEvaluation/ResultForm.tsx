import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button, DatePicker, Select, Breadcrumb, Modal, Form, Input, InputNumber, Col, Row } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './ResultForm.module.scss';
import { Card } from 'antd';
import { SearchOutlined, PlusOutlined, FormOutlined, EditOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useCreatePostMutation } from '../../../api/evaluation.api';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

const ResultForm = () => {

    const [form] = Form.useForm();
    const evaluatedSampleForm = Form.useWatch('evaluatedSample', form);
    const evaluatedCriteriaForm = Form.useWatch('evaluatedCriteria', form);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const [createPost, { isLoading, isError, error, isSuccess }] = useCreatePostMutation();
    useEffect(() => {
        if (isSuccess) {
            console.log(isSuccess);
            setIsModalOpen(false);
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

    const handleOk = () => {
        setIsModalOpen(false);
        console.log(evaluatedSampleForm);
        console.log(evaluatedCriteriaForm);
        const newData = {
            "evaluationFormDetailDTOList": [
                {
                    "id": "",
                    "criteriaSuper": evaluatedCriteriaForm.criteriaSuper,
                    "percent": Number(evaluatedCriteriaForm.percent)
                }
            ],
            "evaluationFormDTO": {
                "id": null,
                "name": evaluatedSampleForm.name,
                "type": evaluatedSampleForm.type
            }
        }
        createPost(newData);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = (values: any) => {
    };
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
    return (
        <div className={styles.btnAction}>
            <Space wrap>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal} danger>
                    Thêm mới
                </Button>
                <Modal title="Thêm mới ngày công" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'Lưu'} cancelText={'Hủy'} width={750}>
                    <div>
                        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} form={form}>
                            <Row>
                                <Col span={12}>
                                    <Form.Item name={['evaluatedSample', 'name']} label="Tên mẫu đáng giá" rules={[{ required: true }]}>
                                        <Input placeholder="Tên mẫu đáng giá" style={{ width: 200 }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item name={['evaluatedSample', 'type']} label="Loại mẫu đánh giá" rules={[{ required: true }]}>
                                        <Select
                                            style={{ width: 200 }}
                                            showSearch
                                            placeholder="--- Chọn ---"
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            onSearch={onSearch}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            options={[
                                                {
                                                    value: 'THANG',
                                                    label: 'Tháng',
                                                },
                                                {
                                                    value: 'QUY',
                                                    label: 'Quý',
                                                },
                                                {
                                                    value: 'KY',
                                                    label: 'Kỳ',
                                                },
                                                {
                                                    value: 'HHHD',
                                                    label: 'Hết hạn hợp đồng',
                                                }
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <p>Tiêu chí</p>
                                </Col>
                            </Row>
                            <Row>
                                <Button type="primary" icon={<PlusOutlined />} onClick={showModal} className={styles.addCriteria}>
                                    Thêm tiêu chí
                                </Button>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item name={['evaluatedCriteria', 'criteriaSuper']} label="Tiêu chí cha:" rules={[{ required: true }]}>
                                        <Select
                                            style={{ width: 200 }}
                                            showSearch
                                            placeholder="--- Chọn ---"
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            onSearch={onSearch}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            options={[
                                                {
                                                    value: 'KQCV',
                                                    label: 'Kết quả công việc',
                                                },
                                                {
                                                    value: 'DGTN',
                                                    label: 'Đánh giá trách nhiệm',
                                                },
                                                {
                                                    value: 'DGNL',
                                                    label: 'Đánh giá năng lực',
                                                },
                                                {
                                                    value: 'DGPT',
                                                    label: 'Đánh giá phát triển',
                                                }
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name={['evaluatedCriteria', 'percent']} label="Trọng số" rules={[{ required: true }]}>
                                        <Input placeholder="Trọng số" style={{ width: 200 }} />
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Button type="primary" icon={<CloseCircleOutlined />} onClick={showModal} className={styles.addCriteria}>
                                        Xóa
                                    </Button></Col>
                            </Row>
                        </Form>
                    </div>
                </Modal>
            </Space>
        </div>
    )
}

export default ResultForm