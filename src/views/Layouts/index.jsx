import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import styles from './BasicLayout.module.scss';

const { Header, Content, Sider } = Layout;

class BasicLayout extends Component {
    render() {
        return (
            <Layout className={styles['outer-layout']}>
                <Sider>
                    <div className="layout-title">
                        <h1 style={{
                            color: '#fff',
                        }}>嘿罗官网</h1>
                    </div>
                </Sider>
                <Layout>
                    <Header className={styles.header}>
                       
                    </Header>
                
                    <Content>
                        <div>
                            dsadhsakjhdhadsajdahkdhkashdkshajkdhsajkhdksahks
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default connect()(BasicLayout);