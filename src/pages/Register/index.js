import React, { useState } from 'react';
import  { Link } from 'react-router-dom';
import { Form, Popover, Progress, Row, Select, Col } from 'antd';
import InputItem from '../../components/InputItem';
import SubmitButton from "../../components/SubmitButton";
import styles from './index.module.less';

const passwordStatusMap = {
    ok: (
        <div className={styles.success}>
            strength: strong
        </div>
    ),
    pass: (
        <div className={styles.warning}>
            strength: medium
        </div>
    ),
    poor: (
        <div className={styles.error}>
            strength: weak
        </div>
    ),
}

const { Option } = Select; 

const passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    poor: 'exception',
}

const Register = () => {
    const [visible, setVisible] = useState(false);
    const [popover, setPopover] = useState(false);
    const [prefix, setPrefix] = useState('86');
    const [form] = Form.useForm();
    const handleFinish = (values) => {
        console.log(values);
    }
    const checkConfirm = (_, value) => {
        const promise = Promise;
        if (value && value !== form.getFieldValue('password')) {
            return promise.reject('passwords do not match!');
        }
        return promise.resolve();
    }

    const getPasswordStatus = () => {
        const value = form.getFieldValue('password');
        if (value && value.length > 9) {
            return 'ok';
        }
        if (value && value.length > 5) {
            return 'pass';
        }
        return 'poor';
    }
    const checkPassword = (_, value) => {
        const promise = Promise;
        if (!value) {
            setVisible(!!value);
            return promise.reject('please input password')
        }
        if (!visible) {
            setVisible(!!value);
        }
        setPopover(!popover);
        if (value && form.getFieldValue('confirm')) {
            form.validateFields(['confirm']);
        }
        return promise.resolve();
    }

    const renderPasswordProgress = () => {
        const value = form.getFieldValue('password');
        const passwordStatus = getPasswordStatus();
        return value && value.length && (
            <div className={styles[`progress-${passwordStatus}`]}>
                <Progress
                    className={styles.progress}
                    status={passwordProgressMap[passwordStatus]}
                    strokeWidth={6}
                    percent={value.length * 10 > 100 ? 100 : value.length * 10}
                    showInfo={false}
                />
            </div>
        )
    }

    return (
        <div className={styles.registerContainer}>
            <div className={styles.register}>
                <Form
                    form={form}
                    onFinish={handleFinish}
                >
                    <InputItem
                        name="mail"
                        placeholder="mailbox"
                        size="large"
                        rules={[
                            {
                                required: true,
                                message: "Please input mail!"
                            },
                            {
                                type: 'email',
                                message: 'Please input mail with right format!'
                            },
                        ]}
                    />
                    <Popover
                        content={
                            visible && (
                                <div>
                                    {passwordStatusMap[getPasswordStatus()]}
                                    {renderPasswordProgress()}
                                    <div>
                                        Please use at least 6 characters. Please avoid easy passwords.
                                </div>
                                </div>
                            )
                        }
                        overlayStyle={{ width: 240 }}
                        placement="right"
                        visible={true}

                    >
                        <InputItem
                            name="password"
                            type="password"
                            placeholder="at least 6 characters"
                            size="large"
                            rules={[
                                {
                                    validator: checkPassword,
                                }
                            ]}
                        />
                    </Popover>
                    <InputItem
                        name="confirm"
                        type="password"
                        placeholder="confirm password"
                        size="large"
                        rules={[
                            {
                                required: true,
                                message: "Please confirm password"
                            },
                            {
                                validator: checkConfirm,
                            }
                        ]}
                    />
                    <Row>
                        <Col span={6}>
                            <Select
                                size="large"
                                value={prefix}
                                onChange={(value) => setPrefix(value)}
                                style={{ width: '100%' }}
                            >
                                <Option value="86">+86</Option>
                                <Option value="1">+1</Option>
                            </Select>
                        </Col>
                        <Col span={18}>
                            <InputItem
                                name="mobile"
                                placeholder="phone number"
                                size="large"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input phone number"
                                    },
                                    {
                                        pattern: /^\d{11}$/,
                                        message: "Incorrect phone format!"

                                    }
                                ]}
                            />
                        </Col>
                    </Row>
                    <InputItem
                        name="captcha"
                        size="large"
                        rules={[
                             {
                                 required: true,
                                 message: 'Please input captcha'
                             }
                        ]}
                        placeholder="captcha"
                    />
                    <Row justify="space-between" align="middle">
                        <Col span={8}>
                        <SubmitButton>Register</SubmitButton>
                        </Col>
                        <Col span={16}>
                            <Link className={styles.login} to="/login">
                                Use existing account to log in
                            </Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
};

export default Register;