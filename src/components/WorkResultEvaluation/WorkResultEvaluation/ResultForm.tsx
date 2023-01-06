import React, { useCallback, useEffect, useState } from 'react';
import { Space, Table, Tag, Button, DatePicker, Select, Breadcrumb, Modal, Form, Input, InputNumber, Col, Row } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './ResultForm.module.scss';
import { Card } from 'antd';
import { SearchOutlined, PlusOutlined, FormOutlined, EditOutlined, DeleteOutlined, CloseCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { evaluationApi, useCreatePostMutation, useGetCriterionByTypeQuery, useGetEvaluationFormByIdQuery } from '../../../api/evaluation.api';
import { WORKRESULTEVALUATION } from "../../../core/constants";
import { useDispatch } from 'react-redux';
import { getEvaluationFormByIdAction } from '../../../redux/features/evaluation.slice';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
interface DataType {
}
const EvaluationTypeTemplate = [
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
]

const Criteria = [
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
]

let defaultValues = {
    "evaluatedSample": {},
    "evaluatedCriteria": []
}

const ResultForm = ({ visible, onCancel, onCreate, item }: any) => {

    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            width: '5%',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tiêu chí con',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
        },
        {
            title: 'Trọng số',
            dataIndex: 'percent',
            key: 'percent',
            width: '30%',
        }
    ]
    const TITLE_ADD = `${WORKRESULTEVALUATION.TITLE_ADD} ${WORKRESULTEVALUATION.TITLE_TEMPLATE}`;
    const [form] = Form.useForm();
    const [isCriterionData, setIsCriterionData] = useState(false);
    const [evaluationType, setEvaluationType] = useState('');
    const { data: dataByType } = useGetCriterionByTypeQuery(evaluationType, {});
    const { data: dataById } = useGetEvaluationFormByIdQuery(item?.id);
    let changing = item?.id;
    if (item) {
        defaultValues.evaluatedSample = item;
        form.setFieldsValue(defaultValues)
    }
    useEffect(() => {
        if (item && Object.entries(item).length > 0) {
            if (dataById && Object.entries(dataById?.responseData).length > 0) {
                if (Object.values(dataById?.responseData)[1]) {
                    const evaluationFormDetailDTOList = Object.values(dataById?.responseData)[1] as [];
                    if (Array.isArray(evaluationFormDetailDTOList) && evaluationFormDetailDTOList.length == 0) {
                        changing = null;
                        setEvaluationType('');
                        setIsCriterionData(false);
                    } else {
                        const evaluationFormDetailDTOList = Object.entries(dataById?.responseData)[1][1];
                        if (Array.isArray(evaluationFormDetailDTOList)) {
                            if (evaluationFormDetailDTOList.length > 0) {
                                // console.log('eva', evaluationFormDetailDTOList);
                                changing = evaluationFormDetailDTOList[0]['id'];
                                evaluationFormDetailDTOList.map((item: any) => setEvaluationType(item.criteriaSuper));
                                setIsCriterionData(true);
                            }
                        }
                    }
                    // binding data to Form
                    defaultValues.evaluatedCriteria = evaluationFormDetailDTOList;
                    form.setFieldsValue(defaultValues)
                }
            }
        }
    }, [changing]);

    const handleChange = (value: string) => {
        setIsCriterionData(true);
        setEvaluationType(value);
    };

    let onCreated = useCallback(() => onCreate(form), []);
    const onCanceled = useCallback(() => {
        setIsCriterionData(false);
        return onCancel()
    }, []);

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
                <Modal
                    title={TITLE_ADD} open={visible} onOk={onCreated} onCancel={onCanceled} okText={'Lưu'} cancelText={'Hủy'} width={750}>
                    <div>
                        <Form {...layout} name="nest-messages" validateMessages={validateMessages} form={form}
                            initialValues={defaultValues} >
                            <Row>
                                <Col span={14}>
                                    <Form.Item name={['evaluatedSample', 'name']} label="Tên mẫu đáng giá" rules={[{ required: true }]}>
                                        <Input placeholder="Tên mẫu đáng giá" style={{ width: 200 }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={14}>
                                    <Form.Item name={['evaluatedSample', 'type']} label="Loại mẫu đánh giá" rules={[{ required: true }]}>
                                        <Select
                                            style={{ width: 200 }}
                                            showSearch
                                            placeholder="--- Chọn ---"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            options={EvaluationTypeTemplate}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <p style={{ 'marginLeft': '0.25rem' }}>Tiêu chí</p>
                                </Col>
                            </Row>
                            <Row>
                                <Form.List name="evaluatedCriteria">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <>
                                                    <Space key={key} style={{ display: 'flex', marginBottom: 8, marginTop: '1.25rem' }} align="baseline">
                                                        <Col span={24}>
                                                            <Form.Item {...restField} name={[name, 'criteriaSuper']} label="Tiêu chí cha:" rules={[{ required: true, message: 'Tiêu chí cha không được để trống!' }]}>
                                                                <Select
                                                                    style={{ width: 200 }}
                                                                    showSearch
                                                                    placeholder="--- Chọn ---"
                                                                    optionFilterProp="children"
                                                                    filterOption={(input, option) =>
                                                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                                    }
                                                                    onChange={handleChange}
                                                                    options={Criteria}
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={20}>
                                                            <Form.Item {...restField} name={[name, 'percent']} label="Trọng số" rules={[{ required: true, message: 'Trọng số không được để trống!' }]}>
                                                                <Input placeholder="Trọng số" style={{ width: 200 }} />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Button type="primary" icon={<CloseCircleOutlined />} className={styles.addCriteria} onClick={() => remove(name)}>
                                                                Xóa
                                                            </Button>
                                                        </Col>
                                                    </Space>
                                                    <Row className={styles.tableCriteria}>
                                                        {isCriterionData && dataByType?.responseData && dataByType?.responseData.length > 0 && <Table columns={columns} dataSource={dataByType?.responseData} className={styles.tableCriteria} pagination={false} />}
                                                    </Row>
                                                </>
                                            ))}
                                            <Row className={styles.tableCriteria}>
                                                <Button type="dashed" className={`${styles.addCriteria} ${styles.btnAddCriteria}`} onClick={() => add()} block icon={<PlusOutlined />}>
                                                    Thêm tiêu chí
                                                </Button>
                                            </Row>
                                        </>
                                    )}
                                </Form.List>
                            </Row>
                        </Form>
                    </div>
                </Modal>
            </Space>
        </div>
    )
}

export default ResultForm