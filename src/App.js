import React, { Component } from 'react';
import './App.css';
import { Card,Row,Col,Input,Button,message,Icon } from 'antd'

class App extends Component {

  constructor(props){
    super(props)
    
    const newTasks = []
    for(let i=1; i<=25 ;i++ ){
      const task = {
        name: i ,
        opacity : 1
      }
    newTasks.push(task)
    }

    this.state = {
      tasks: newTasks,
      images: ['zoo1.jpg','zoo2.jpg','zoo3.jpg','zoo4.jpg'],
      indexImage: 0,
      value: '',
      answers: ['นกแก้ว','แรด','แมว','นกฮูก'],
      point: 100
     
    }
  }

  rowStyle = {
    width: '30%',
		height:'200px',
    margin: '0 auto',
  };

  image = {
    width: '30%',
		height:'344px',
    margin: '0 auto',
    
  };

  gridStyle = (data) => ({
    background: '#ffffff',
    opacity: data,
    width: '20%',
    textAlign: 'center'
  });


  setZeroOpacity = (name) => () =>{
    const { tasks,indexImage,point } = this.state
    const index = tasks.findIndex((task) => task.name === name)
    if(indexImage !== 4 && tasks[index].opacity === 1 ){
      const newTasks = tasks.map((task,pos) => {
      if(pos === index) return ({ ...task, opacity: 0 })
      return task
      })
      const newPoint = point-1
    
      this.setState({
        tasks: newTasks,
        point: newPoint
      })
    }
    if(indexImage === 4){
      message.warning('พอแล้วกูไม่มีรูปให้มึงเล่นแล้ว');
    }
  }

  setOneOpacity = () => () =>{
    const { tasks , indexImage,value,answers,point} = this.state
    let newIndex = indexImage

    if(value.length === 0 && indexImage !== 4){
      message.warning('มึงยังไม่ได้พิม ไอ้โง่!!!');
    }

    if(value === answers[indexImage] && value.length !== 0){
      if(indexImage !== 4){
        newIndex = indexImage+1
      }

      message.success('ถั่วต้ม');

      const newTasks = tasks.map((task,pos) => {
        return ({ ...task, opacity: 1 })
      })

      const newPoint = point+5

      this.setState({
        tasks: newTasks,
        indexImage: newIndex,
        value: '',
        point: newPoint
      })
    }

    if(value !== answers[indexImage] && indexImage <= 3 && value.length !== 0){
      message.error('ผิดเจ้าโง่');
      const newPoint = point-5
      this.setState({
        point: newPoint
      })
    }

    if(indexImage === 4){
      message.warning('พอแล้วกูไม่มีรูปให้มึงเล่นแล้ว');
      const newTasks = tasks.map((task,pos) => {
        return ({ ...task, opacity: 1 })
      })

      this.setState({
        tasks: newTasks,
        value: ''
      })
    }

  }

  onChange = (e) => {
    const {value} = e.target
    this.setState({value})
  }

  setImage = (name) => `${process.env.PUBLIC_URL}/image/${name}`
  
  




  render() {
    const { tasks,images,indexImage,value,point } = this.state
    return (
      <>
      <div style={{width: '30%',margin: '0 auto',textAlign: 'center'}}>
          <h1 ><Icon type="qq"  /> สัตว์อะไรเอ่ยทายสิๆ </h1>
      </div>
      <div style={{width: '30%',margin: '0 auto',textAlign: 'right'}}>
          <h3 >คะแนน : <span>{point}</span> </h3>
          
      </div>
      <Col className="App" span={24} style={{position: 'absolute'}}>
      <img src={this.setImage(images[indexImage])} style={this.image} />
      </Col>
      <Col className="App" span={24} >
        <Row gutter={24} style={this.rowStyle}>          
          {tasks.map((task, index) =>{ 
            return(
              <Card.Grid style={this.gridStyle(task.opacity)}  onClick={this.setZeroOpacity(task.name)} >{task.name}</Card.Grid>
            )
          })}
        </Row> 
      </Col>
      <Col className="App" span={24} style = {{ padding: '20px' }} >
      <Input placeholder="ตอบมาดิ" value = {value} onChange = {this.onChange} onPressEnter = {this.setOneOpacity()} style = {{ width: '15%',margin:'5px'}}/>
      <Button onClick={this.setOneOpacity()}>ตอบ</Button>

      </Col>
      </>
    );
  }
}

export default App;
