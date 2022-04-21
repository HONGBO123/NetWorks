import React, {Component} from 'react';
import { List, Avatar, Button, Checkbox, Spin } from 'antd';
import satellite from "../assets/images/satellite.svg";

class SatelliteList extends Component {
    constructor(){
        super();
        this.state = {
            selected: []
        };
    }

    onChange = e => {
        const { dataInfo, checked } = e.target;
        // add or remove selected sat to /from selected array
        //update the selected using class to write
        const { selected } = this.state;
        // receive the new list that return
        const list = this.addOrRemove(dataInfo, checked, selected);
        this.setState({ selected: list })
    }
    // add Remove class into and out check or uncheck. return a new list
    addOrRemove = (item, status, list) => {
        //case1: check it true
        //     case1: item not in the list-> add it
        //     case2: item in the list-> do nothing
        // case2: check is false
        //      case1: item is in the list-> remove list
        //      case2: item not in the list -> do nothing
        const found = list.some( entry => entry.satid === item.satid);
        if(status && !found){
            list=[...list, item]
        }

        if(!status && found){
            list = list.filter( entry => {
                return entry.satid !== item.satid;
            });
        }
        return list;
    }

    onShowSatMap = () =>{
        this.props.onShowMap(this.state.selected);
    }

    render() {
        const satList = this.props.satInfo ? this.props.satInfo.above : [];
        const { isLoad } = this.props;
        const { selected } = this.state;

        return (
            <div className="sat-list-box">
                <Button className="sat-list-btn"
                        type="primary"
                        size="large"
                        disabled={ selected.length === 0}
                        onClick={this.onShowSatMap}
                >Track on the map</Button>
                <hr/>

                {
                    isLoad ?
                        <div className="spin-box">
                            <Spin tip="Loading..." size="large" />
                        </div>
                        :
                        <List
                            className="sat-list"
                            itemLayout="horizontal"
                            size="small"
                            dataSource={satList}
                            renderItem={item => (
                                <List.Item
                                    actions={[<Checkbox dataInfo={item} onChange={this.onChange}/>]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar size={50} src={satellite} />}
                                        title={<p>{item.satname}</p>}
                                        description={`Launch Date: ${item.launchDate}`}
                                    />

                                </List.Item>
                            )}
                        />
                }
            </div>
        );
    }
}

export default SatelliteList;


