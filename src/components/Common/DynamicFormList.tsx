import React, { useCallback, useState } from "react";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Space, Table, Tag, Button, DatePicker, Select, Breadcrumb, Modal, Form, Input, InputNumber, Col, Row, SelectProps } from 'antd';
import styles from './DynamicFormList.module.scss';

let curKey: number
let fieldsData: any
const DynamicFormList = ({ dataObj, handleChange }: any) => {
    const childCriteria = dataObj.item && dataObj.dataByType && dataObj.dataByType?.responseData && dataObj.dataByType?.responseData.length > 0 && dataObj.dataByType?.responseData?.map((item: any) => dataObj.item.map((ite: any) => {
        if (ite == item['type']) return item
    }).filter((el: any) => el !== undefined)).map((i: any) => Object.assign({}, i)[0]) as [];
    const criteria = {childCriteria: childCriteria}

    const handleChanges = (val: any, key: any) => {
        handleChange(val);
        curKey = key;
        fieldsData = fieldsData.filter((element: any, index: any) => (fieldsData.indexOf(element) === index))
        fieldsData = fieldsData.filter((item: any) =>  ({...item, childCriteria: criteria}))
    }

    const convertField = (val: any) => {
        fieldsData = val
        fieldsData = fieldsData.filter((item: any) => {
            // if(item?.key !== curKey && criteria) return  {...item, childCriteria: criteria}
            return Object.assign(item, criteria)
        })
    }
    return (
        <Form.List name="fields">
            {(fields, { add, remove }) => (
                <>{convertField(fields)}
                    {fieldsData.map(({ key, name, childCriteria,...restField }: any) => (
                        <>
                            <div key={key}>
                                <Space style={{ display: 'flex', marginBottom: 8, marginTop: '1.25rem' }} align="baseline">
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
                                                onChange={(val) => { handleChanges(val, key) }}
                                                options={dataObj.criteria}
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
                                    {/* {childCriteria && Array.isArray(childCriteria)
                                        && <Table columns={dataObj.columns} dataSource={childCriteria} className={styles.tableCriteria} pagination={false} />} */}
                                        {childCriteria && Array.isArray(childCriteria)
                                        && <Table columns={dataObj.columns} dataSource={childCriteria} className={styles.tableCriteria} pagination={false} />}
                                </Row>
                            </div>
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
    )
}
export default DynamicFormList;