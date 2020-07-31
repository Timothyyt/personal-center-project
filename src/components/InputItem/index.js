import React, { useState, useEffect } from 'react'
import { useDispatch } from 'redux-react-hook';
import { Input, Form, Button, Row, Col, message } from 'antd';
import { getCaptcha } from '../../actions/register';
import style from './index.module.less'

const InputItem = React.forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const { name, rules, ...rest } = props;
    const [timing, setTiming] = useState(false); // start countdown?
    const [count, setCount] = useState(props.countDown || 60); // countdown seconds
    const handleClickCaptcha = () => {
        message.success('Get captcha 1234');
        dispatch(getCaptcha());
        setTiming(true);
    }

    useEffect(() => {
        let interval = 0;
        if (timing) {
            interval = window.setInterval(() => {
                setCount((preSecond) => {
                    if (preSecond <= 1) {
                        setTiming(false). // countdown ends
                        clearInterval(interval);
                        return props.countDown || 60;
                    }
                    return preSecond - 1;
                })
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timing, props.countDown]);

    if (name === 'captcha') {
        return (
            <Form.Item name={name} rules={rules}>
                <Row gutter={8}>
                    <Col span={16}>
                        <Input {...rest} />
                    </Col>
                    <Col span={8}>
                        <Button 
                            className={style.getCaptcha}
                            disabled={timing}  
                            size="large"
                            onClick={handleClickCaptcha}
                        >
                            { timing ? `${count}second` : 'Get Captcha' }
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        )
    }
    return (
        <Form.Item name={name} rules={rules}>
            <Input ref={ref} {...rest} />
        </Form.Item>
    )
});

export default InputItem;