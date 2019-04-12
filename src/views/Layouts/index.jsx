import React, { Component } from 'react';
import { Layout, Tabs } from 'antd';
import { connect } from 'react-redux';
import styles from './BasicLayout.module.scss';
import BaseHeader from './BaseHeader';

const {Content} = Layout;

const BaseContent = (props) => {
    const {routeAll} = props;
    
    return (
        <Content className={styles["views-layouts-content"]}>
            <div>
                <Tabs>
                    <Tabs.TabPane key={1} tab="tab1">
                    <div
                        className={styles["views-layouts-content-content"]}
                    >   
                        e2189371983
                        {routeAll}
                    </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={2} tab="tab2">dsaks</Tabs.TabPane>
                </Tabs>
            </div>
            
        </Content>
    )
}

class BasicLayout extends Component {
    render() {
        return (
            <Layout className={styles['outer-layout']}>
                <BaseHeader>
                
                </BaseHeader>
                <BaseContent>
                </BaseContent>
            </Layout>
        );
    }
}

export default connect()(BasicLayout);