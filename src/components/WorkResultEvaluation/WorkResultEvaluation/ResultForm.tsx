import React, { useCallback, useEffect, useState } from 'react';
import { Space, Table, Tag, Button, DatePicker, Select, Breadcrumb, Modal, Form, Input, InputNumber, Col, Row, SelectProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './ResultForm.module.scss';
import { Card } from 'antd';
import { SearchOutlined, PlusOutlined, FormOutlined, EditOutlined, DeleteOutlined, CloseCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { evaluationApi, useCreatePostMutation, useGetCriterionByTypeQuery, useGetEvaluationFormByIdQuery } from '../../../api/evaluation.api';
import { WORKRESULTEVALUATION } from "../../../core/constants";
import { useDispatch } from 'react-redux';
import { getEvaluationFormByIdAction } from '../../../redux/features/evaluation.slice';
import DynamicFormList from '../../Common/DynamicFormList';
import { useNavigate } from 'react-router-dom';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
interface DataType {
}

let defaultValues = {
    "evaluatedSample": {},
    "evaluatedCriteria": []
}

let parentCriteria: any[] = []
const ResultForm = ({ visible, onCancel, onCreate, item }: any) => {
    const EvaluationTypeTemplate = () => {
        const data = item?.evaluateForm?.responseData;
        if (data && Array.isArray(data)) {
            let optionsData: SelectProps['options'] = [];
            optionsData = data.map((item: any) => ({
                'label': item['paramName'],
                'value': item['paramCode'],
            }))
            return optionsData
        }
    }

    const Criteria = () => {
        const data = item?.evaluateType?.responseData
        if (data && Array.isArray(data)) {
            let optionsData: SelectProps['options'] = [];
            optionsData = data.map((item: any) => {
                    parentCriteria.push(item['paramCode'])
                return ({
                'label': item['paramName'],
                'value': item['paramCode'],
            })
        })
            return optionsData
        }
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
    const [criterionData, setCriterionData] = useState([]);
    const [evaluationType, setEvaluationType] = useState('');
    const { data: dataByType, isLoading, isError, error, isSuccess } = useGetCriterionByTypeQuery(evaluationType, {});
    const { data: dataById } = useGetEvaluationFormByIdQuery(item?.id);

    let changing = item?.id;
    if (item) {
        defaultValues.evaluatedSample = item;
        form.setFieldsValue(defaultValues)
    }

    parentCriteria = parentCriteria.filter((element, index) => {
        return parentCriteria.indexOf(element) === index;
    });
    const childCriteria = parentCriteria && dataByType && dataByType?.responseData && dataByType?.responseData.length> 0 && dataByType?.responseData?.map((item) => parentCriteria.map((ite: any) => {
           if (ite == item['type']) return item
        }).filter(el => el !== undefined)).map(i => Object.assign({}, i)[0]) as []
    // console.log(childCriteria);
    const navigate = useNavigate()
    useEffect(() => {
        if (isError) {
          if (error && Object.values(error).includes(401)) {
            setTimeout(() => {
              navigate('/auth')
            }, 3000)
          }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isLoading]);
    
    useEffect(() => {
        if (item && Object.entries(item).length > 0) {
            if (dataById && Object.entries(dataById?.responseData).length > 0) {
                if (Object.values(dataById?.responseData)[1]) {
                    const evaluationFormDetailDTOList = Object.values(dataById?.responseData)[1] as [];
                    if (Array.isArray(evaluationFormDetailDTOList) && evaluationFormDetailDTOList.length == 0 && isCriterionData) {
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
        console.log(criterionData);
    }, [item]);

    const handleChange = (value: string) => {
        console.log(127, value);
        // evaluationDataByType.push(value);
        // setIsCriterionData(true);
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
    const dataObj = {
        criteria: Criteria(),
        item: parentCriteria,
        dataByType: dataByType,
        columns: columns
    }
    // console.log(dataObj);

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
                                                (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                            }
                                            options={EvaluationTypeTemplate()}
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
                                <DynamicFormList dataObj={dataObj} handleChange={handleChange}/>
                                {/* <Form.List name="evaluatedCriteria">
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
                                                                        (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                                                    }
                                                                    onChange={handleChange}
                                                                    options={Criteria()}
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
                                                        {childCriteria && Array.isArray(childCriteria) && <Table columns={columns} dataSource={childCriteria} className={styles.tableCriteria} pagination={false} />}
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
                                </Form.List> */}
                            </Row>
                        </Form>
                    </div>
                </Modal>
            </Space>
        </div>
    )
}

export default ResultForm