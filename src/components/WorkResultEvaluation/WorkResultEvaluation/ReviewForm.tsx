import React, { useCallback, useEffect, useState } from 'react';
import { Space, Table, Tag, Button, DatePicker, Select, Breadcrumb, Modal, Form, Input, InputNumber, Col, Row } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './ReviewForm.module.scss';
import { Card } from 'antd';
import { SearchOutlined, PlusOutlined, FormOutlined, EditOutlined, DeleteOutlined, CloseCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { evaluationApi, useCreatePostMutation, useGetAssignedDataQuery, useGetContractQuery, useGetCriterionByTypeQuery, useGetEvaluateFormQuery, useGetEvaluateTypeQuery, useGetEvaluationFormByIdQuery, useGetListDeptActiveQuery, useGetListEmployeeCodeByEvaluationFormQuery, useGetProjectQuery } from '../../../api/evaluation.api';
import { WORKRESULTEVALUATION } from "../../../core/constants";
import { useDispatch } from 'react-redux';
import { getEvaluationFormByIdAction } from '../../../redux/features/evaluation.slice';
import type { SelectProps } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
interface DataType {
    key: React.Key;
    employeeCode: any;
}


const EvaluationStatus = [
    {
        value: 'THANG',
        label: 'Chưa gán',
    },
    {
        value: 'QUY',
        label: 'Đã gán',
    }
]

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

const dataF: React.Key[][] = [];

const ReviewForm = ({ isVisible, onCancel, onCreate, item }: any) => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Mã nhân viên',
            dataIndex: 'employeeCode',
            key: 'employeeCode',
            width: '50%',
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'fullName',
            key: 'fullName',
            width: '50%',
        }
    ]
    const TITLE_ADD = `${WORKRESULTEVALUATION.TITLE_ADD} ${WORKRESULTEVALUATION.TITLE_TEMPLATE}`;
    const [form] = Form.useForm();
    const [isCriterionData, setIsCriterionData] = useState(false);
    const [assignedData, setAssignedData] = useState([]);
    const [evaluateFormData, setEvaluateFormData] = useState({});
    const [evaluateTypeData, setEvaluateTypeData] = useState({});
    const [employeeData, setEmployeeData] = useState({});
    const [evaluationType, setEvaluationType] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);


    const { data: dataByType } = useGetCriterionByTypeQuery(evaluationType, {});
    const { data: dataById } = useGetEvaluationFormByIdQuery(item?.id);
    const { data: dataAssigned } = useGetAssignedDataQuery('');
    const { data: listDeptActivedData } = useGetListDeptActiveQuery('');
    const { data: contract } = useGetContractQuery('');
    const { data: project } = useGetProjectQuery('');
    const { data: evaluateForm } = useGetEvaluateFormQuery('');
    const { data: evaluateType } = useGetEvaluateTypeQuery('');
    const { data: employee } = useGetListEmployeeCodeByEvaluationFormQuery('');

    let changing = item?.id;
    const listDeptActivedDataOption = () => {
        if (listDeptActivedData && listDeptActivedData?.responseData) {
            const optionsData: SelectProps['options'] = [];
            for (let i = 0; i < listDeptActivedData?.responseData.length; i++) {
                if (listDeptActivedData?.responseData[i]) {
                    optionsData.push({
                        label: listDeptActivedData?.responseData[i]['deptName'],
                        value: listDeptActivedData?.responseData[i]['deptId'],
                    });
                }
            }
            return optionsData
        }
    }
    const contractOption = () => {
        if (contract && contract?.responseData) {
            const optionsData: SelectProps['options'] = [];
            for (let i = 0; i < contract?.responseData.length; i++) {
                if (contract?.responseData[i]) {
                    optionsData.push({
                        label: contract?.responseData[i]['paramName'],
                        value: contract?.responseData[i]['paramId'],
                    });
                }
            }
            return optionsData
        }
    }
    const projectOption = () => {
        if (project && Array.isArray(project)) {
            let optionsData: SelectProps['options'] = [];
            optionsData = project.map((item: any) => ({
                'label': item['projCode'],
                'value': item['id'],
            }))
            return optionsData
        }
    }
    useEffect(() => {
        if (dataAssigned && dataAssigned?.responseData) setAssignedData(dataAssigned?.responseData);
        if (evaluateForm && evaluateForm?.responseData) setEvaluateFormData(evaluateForm?.responseData);
        if (evaluateType && evaluateType?.responseData) setEvaluateTypeData(evaluateType?.responseData);
        if (employee && employee?.responseData) setEmployeeData(employee?.responseData);
    }, [item]);

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
                }
            }
        }
    }, [changing]);

    const handleChange = (value: string) => {
        setIsCriterionData(true);
        setEvaluationType(value);
    };

    const onCanceled = useCallback(() => {
        setIsCriterionData(false);
        return onCancel()
    }, []);

    const onSelectChange = (newSelectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    dataF.push(selectedRowKeys)
    
    let onCreated = useCallback(() => onCreate(dataF.pop()), []);

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div>
            <Space wrap>
                <Modal
                    title={TITLE_ADD} open={isVisible} onOk={onCreated} onCancel={onCanceled} okText={'Lưu'} cancelText={'Hủy'} width={1000}>
                    <div className={styles.containerForm}>
                        <table>
                            <tbody>
                                <tr>
                                    <th className={styles.leftContainer}>
                                        <Table rowSelection={rowSelection} columns={columns} dataSource={assignedData} className={styles.listTable} rowKey={(record) => record.employeeCode} />
                                    </th>
                                    <th className={styles.rightContainer}>
                                        <Form {...layout} name="nest-messages" form={form}>
                                            <div className={styles.rightForm}>
                                                <Row className={styles.customFilter}>
                                                    <Col span={12}>
                                                        <span className={styles.customFilterTitle}>Bộ lọc</span>
                                                        <hr className={styles.customHr} />
                                                    </Col>
                                                </Row>
                                                <Row className={styles.customRow}>
                                                    <Col span={14}>
                                                        <p>Trạng thái</p>
                                                        <Form.Item name={['evaluatedSample', 'status']} label="" rules={[{ required: true }]} className={styles.customForm}>
                                                            <Select
                                                                style={{ width: 200 }}
                                                                showSearch
                                                                placeholder="--- Chọn ---"
                                                                optionFilterProp="children"
                                                                options={EvaluationStatus}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row className={styles.customRow}>
                                                    <Col span={15}>
                                                        <p className={styles.customNameInput}>Tên nhân viên</p>
                                                        <Form.Item name={['evaluatedSample', 'name']} label="" rules={[{ required: true }]} className={styles.customForm}>
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
                                                <Row className={styles.customRow}>
                                                    <Col span={14}>
                                                        <p>Phòng ban</p>
                                                        <Form.Item name={['evaluatedSample', 'dept']} label="" rules={[{ required: true }]} className={styles.customForm}>
                                                            <Select
                                                                style={{ width: 200 }}
                                                                showSearch
                                                                placeholder="--- Chọn ---"
                                                                optionFilterProp="children"
                                                                filterOption={(input, option: any) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                                }
                                                                options={listDeptActivedDataOption()}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row className={styles.customRow}>
                                                    <Col span={15}>
                                                        <p className={styles.customInput}>Loại hợp đồng</p>
                                                        <Form.Item name={['evaluatedSample', 'contract']} label="" rules={[{ required: true }]} className={styles.customForm}>
                                                            <Select
                                                                style={{ width: 200 }}
                                                                showSearch
                                                                placeholder="--- Chọn ---"
                                                                optionFilterProp="children"
                                                                filterOption={(input, option) => (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                                                }
                                                                options={contractOption()}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row className={styles.customRow}>
                                                    <Col span={14}>
                                                        <p>Mã dự án</p>
                                                        <Form.Item name={['evaluatedSample', 'project']} label="" rules={[{ required: true }]} className={styles.customForm}>
                                                            <Select
                                                                style={{ width: 200 }}
                                                                showSearch
                                                                placeholder="--- Chọn ---"
                                                                optionFilterProp="children"
                                                                filterOption={(input, option) =>
                                                                    (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                                                }
                                                                options={projectOption()}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Form>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal>
            </Space>
        </div>
    )
}

export default ReviewForm