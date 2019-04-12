import React, {PureComponent} from 'react';
import {Layout, Input, Avatar, Menu, Popover} from 'antd';
import {Link} from 'react-router-dom';

import {BRAND_TITLE} from '../../constants/config';
import {getRoute} from '../../utils/urls';
import styles from './BasicLayout.module.scss';

const {Header} = Layout;
const Search = Input.Search;


class BaseHeader extends PureComponent {

    render() {

        const QiPiTitle = () => (
            <div>
                <Link to={getRoute('/')}>
                    <h1>{BRAND_TITLE}</h1>
                </Link>
            </div>
        )

        const getMenus = () => {
            return (
                <Menu>
                    <Menu.Item>dsahdhaj</Menu.Item>
                    <Menu.Item>dsahdhaj</Menu.Item>
                </Menu>
            )
        }

        return (
            <Header className={styles["views-layouts-header"]}>

                {QiPiTitle()}
                <div>
                    <Search
                        placeholder="输入搜索内容"
                        onSearch={() => alert("kakak")}
                        className={styles["views-layouts-div-search"]}
                    ></Search>
                </div>
                <div>
                    <div>
                    </div>
                    <Popover title={getMenus()} content="dkahdsahjds">
                        <div>
                            <Avatar src="" alt="qps"></Avatar>
                            <span>dsjakjdsj</span>
                        </div>
                    </Popover>
                </div>
            </Header>
        )
    }
}

export default BaseHeader;