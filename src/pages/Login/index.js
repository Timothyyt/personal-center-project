import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Form, Checkbox, Row } from "antd";
import { 
    UserOutlined, LockTwoTone, MobileTwoTone, MailTwoTone, 
    AlipayCircleOutlined, TaobaoCircleOutlined,  WeiboCircleOutlined
} from '@ant-design/icons'; 
import InputItem from '../../components/InputItem';
import SubmitButton from '../../components/SubmitButton';
import styles from './index.module.less';

const { TabPane } = Tabs;

const Login = () => {
    const [autoLogin, setAutoLogin] = useState(true);
    const [form] = Form.useForm();
    const handleFinish = (values) => {
        console.log(values);
    }
    return (
        <div className={styles.loginContainer}>
            <div className={styles.login}>
                <Form
                    form={form}
                    onFinish={handleFinish}
                >
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Username/Password login" key="1">
                            <InputItem 
                                name="username"
                                prefix={
                                    <UserOutlined style={{color: '#1890ff'}} />
                                }
                                placeholder="user name" 
                                size="large"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input username!"
                                    }
                                ]}
                            />
                            <InputItem 
                                name="password"
                                type="password"
                                prefix={
                                    <LockTwoTone style={{color: '#1890ff'}} />
                                }
                                placeholder="password" 
                                size="large"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input password"
                                    }
                                ]}
                            />
                        </TabPane>
                        <TabPane tab="phone login" key="2">
                        <InputItem 
                                name="mobile"
                                prefix={
                                    <MobileTwoTone />
                                }
                                placeholder="phone number" 
                                size="large"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input phone number!"
                                    }
                                ]}
                            />
                            <InputItem 
                                name="captcha"
                                prefix={
                                    <MailTwoTone style={{color: '#1890ff'}} />
                                }
                                placeholder="captcha" 
                                size="large"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input captcha"
                                    }
                                ]}
                            />
                        </TabPane>
                    </Tabs>
                    <Row justify="space-between">
                        <Checkbox
                            checked={autoLogin}
                            onChange={(e) => setAutoLogin(e.target.checked)}
                        >
                            auto-login
                        </Checkbox>
                        <a href="#!">forget password</a>
                    </Row>
                    <SubmitButton>Login</SubmitButton>
                </Form>
                <div className={styles}>
                    Other login methods
                    <AlipayCircleOutlined className={styles.icon} />
                    <TaobaoCircleOutlined className={styles.icon} />
                    <WeiboCircleOutlined className={styles.icon} />
                    <Link className={styles.other} to="/register">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Login;