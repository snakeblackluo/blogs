import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

class LoginUser extends Component {
    
    render() {
        return (
            <Button type="primary" htmlType="button">
                提交
            </Button>
        );
    }
}

export default connect()(LoginUser);