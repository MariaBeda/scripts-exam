import React, { Component } from 'react';
import { Input, Table, Button, Modal, Select, InputNumber } from 'antd';
import axios from 'axios';

class Items extends Component {

    state = {
        word: '',
        showAdd: false,
        showEdit: false,
        nameAdd: '',
        categoryAdd: 'Furniture',
        weightAdd: '',
        priceAdd: '',
        countAdd: '',
        producerAdd: '',
        editKey: '',
        nameEdit: '',
        categoryEdit: '',
        weightEdit: '',
        priceEdit: '',
        countEdit: '',
        producerEdit: '',
        stock: '',
        itemsAdd: []
    };

    async componentDidMount() {
        try {
            const response = await axios.get('https://scripts-exam-fc585.firebaseio.com/items.json');
            console.log(response.data);
            const itemsAdd = Object.entries(response.data).map((item) => {
                return {
                    key: item[0],
                    name: item[1].name,
                    category: item[1].category,
                    weight: item[1].weight,
                    price: item[1].price,
                    count: item[1].count,
                    producer: item[1].producer,
                    stock: item[1].stock,
                    counter: item[1].count
                }
            })
            this.setState({itemsAdd})
        } catch (e) {
            console.log(e);
        }
    }

    editHandler = (key, name, category, weight, price, count, producer, stock) => {
        this.setState({
            showEdit: true,
            editKey: key,
            nameEdit: name,
            categoryEdit: category,
            weightEdit: weight,
            priceEdit: price,
            countEdit: count,
            producerEdit: producer,
            stock: stock,
        })
    };

    showAdd = () => {
        this.setState({
          showAdd: true,
        });
      };

    closeAdd = () => {
        this.setState({showAdd: false})
    };

    closeEdit = () => {
        this.setState({showEdit: false})
    };

    changeAddName = event => {
        this.setState({nameAdd: event.target.value})
    };
    changeAddCategory = value => {
        this.setState({categoryAdd: value})
    };
    changeAddWeight = value => {
        this.setState({weightAdd: value})
    };
    changeAddPrice = value => {
        this.setState({priceAdd: value})
    };
    changeAddCount = value => {
        this.setState({countAdd: value})
    };
    changeAddProducer = event => {
        this.setState({producerAdd: event.target.value})
    };

    changeEditName = event => {
        this.setState({nameEdit: event.target.value})
    };
    changeEditCategory = value => {
        this.setState({categoryEdit: value})
    };
    changeEditWeight = value => {
        this.setState({weightEdit: value})
    };
    changeEditPrice = value => {
        this.setState({priceEdit: value})
    };
    changeEditCount = value => {
        this.setState({countEdit: value})
    };
    changeEditProducer = event => {
        this.setState({producerEdit: event.target.value})
    };

    counterPlus = (id) => {
        console.log(id);
        console.log(this.state.itemsAdd.filter(item => item.editKey === id));
        // this.setState(prevState => {
        //     return {
        //         ...prevState,
        //         itemsAdd: prevState.counter + 1
        //     }
        // })
    }

    counterMinus = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                counter: prevState.counter - 1
            }
        })
    }
    
    sendAddData = async () => {
        try {
            if (this.state.countAdd === 0) {
                const stock = 'No';
                await axios.post('https://scripts-exam-fc585.firebaseio.com/items.json', {
                name: this.state.nameAdd,
                category: this.state.categoryAdd,
                weight: this.state.weightAdd,
                price: this.state.priceAdd,
                count: this.state.countAdd,
                producer: this.state.producerAdd,
                stock: stock,
            })
            } else {
                const stock = 'Yes';
                await axios.post('https://scripts-exam-fc585.firebaseio.com/items.json', {
                name: this.state.nameAdd,
                category: this.state.categoryAdd,
                weight: this.state.weightAdd,
                price: this.state.priceAdd,
                count: this.state.countAdd,
                producer: this.state.producerAdd,
                stock: stock,
            })
            }
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    };

    sendEditData = async () => {
        try {
            await axios.put(`https://scripts-exam-fc585.firebaseio.com/items/${this.state.editKey}.json`, {
                name: this.state.nameEdit,
                category: this.state.categoryEdit,
                producer: this.state.producerEdit,
                weight: this.state.weightEdit,
                price: this.state.priceEdit,
                count: this.state.countEdit,
                stock: this.state.stock,
            })
            window.location.reload();
        } catch(e) {
            console.log(e);
        }
    }

    deleteHandler = async id => {
        try {
            await axios.delete(`https://scripts-exam-fc585.firebaseio.com/items/${id}.json`);
            window.location.reload();
        } catch(e) {
            console.log(e);
        }
    }

    searchHandler = event => {
        this.setState({word: event.target.value})
    }

    filterHandler = term => {
        return function(x) {
            return (x.name.toLowerCase()).includes(term.toLowerCase()) || !term
        }
    }

    render() {
        console.log(this.state.counter);
        const { Search } = Input;  
        const { Option } = Select;
        const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Category',
              dataIndex: 'category',
              key: 'category',
              filters: [
                {
                  text: 'Funiture',
                  value: 'Funiture',
                },
                {
                  text: 'Techic',
                  value: 'Techic',
                },
                {
                  text: 'Books',
                  value: 'Books',
                },
                {
                  text: 'Phones',
                  value: 'Phones',
                },
              ],
              onFilter: (value, record) => record.category.indexOf(value) === 0,
            },
            {
                title: 'Producer',
                dataIndex: 'producer',
                key: 'producer',
            },
            {
              title: 'Weight',
              dataIndex: 'weight',
              key: 'weight',
            },
            {
              title: 'Price',
              key: 'price',
              dataIndex: 'price',
              sorter: (a, b) => a.price - b.price,
            },
            {
                title: 'Count',
                key: 'count',
                dataIndex: 'count',
                sorter: (a, b) => a.count - b.count,
              },
              {
                title: 'Stock',
                key: 'stock',
                dataIndex: 'stock',
                sorter: (a, b) => a.stock - b.stock,
              },
            {
              title: 'Action',
              key: 'action',
              render: (record) => (
                  <div className='actions'>
                      <Button type='danger' style={{marginRight: '1rem'}} onClick={() => this.deleteHandler(record.key)}><i className='fa fa-trash'></i></Button>
                      <Button type='primary'  onClick={() => this.editHandler(record.key, record.name, record.category, record.weight, record.price, record.count, record.producer, record.stock)}><i className='fa fa-edit'></i></Button>
                  </div>
              ),
            },
          ];
          console.log(this.state.itemsAdd);
        return (
            <div className='Items'>
                <Modal
                    title="Add new item"
                    visible={this.state.showAdd}
                    onOk={this.sendAddData}
                    onCancel={this.closeAdd}
                    >
                        <p style={{marginBottom: '1rem'}}>Name</p>
                        <Input placeholder="Enter the name" style={{marginTop: '0'}} onChange={this.changeAddName} />
                        <p>Categoty</p>
                        <Select defaultValue="Funiture" onChange={this.changeAddCategory}>
                            <Option value="Funiture">Funiture</Option>
                            <Option value="Techic">Techic</Option>
                            <Option value="Books">Books</Option>
                            <Option value="Phones">Phones</Option>
                        </Select>
                        <p style={{marginBottom: '1rem'}}>Producer</p>
                        <Input placeholder="Enter the producer" style={{marginTop: '0'}} onChange={this.changeAddProducer} />
                        <p>Weight KG</p>
                        <InputNumber min={0} max={500} defaultValue={0} onChange={this.changeAddWeight} />
                        <p>Price</p>
                        <InputNumber min={0} max={10000} defaultValue={100} onChange={this.changeAddPrice} />
                        <p>Count</p>
                        <InputNumber min={0} max={500} defaultValue={20} onChange={this.changeAddCount} />
                </Modal>

                <Modal
                    title="Edit current item"
                    visible={this.state.showEdit}
                    onOk={this.sendEditData}
                    onCancel={this.closeEdit}
                    >
                        <p style={{marginBottom: '1rem'}}>Name</p>
                        <Input placeholder="Enter the name" style={{marginTop: '0'}} defaultValue={this.state.nameEdit} onChange={this.changeEditName} />
                        <p>Categoty</p>
                        <Select defaultValue={this.state.categoryEdit} onChange={this.changeEditCategory}>
                            <Option value="Funiture">Funiture</Option>
                            <Option value="Techic">Techic</Option>
                            <Option value="Books">Books</Option>
                            <Option value="Phones">Phones</Option>
                        </Select>
                        <p style={{marginBottom: '1rem'}}>Producer</p>
                        <Input placeholder="Enter the producer" defaultValue={this.state.producerEdit} onChange={this.changeEditProducer} />
                        <p>Weight KG</p>
                        <InputNumber min={0} max={500} defaultValue={this.state.weightEdit} onChange={this.changeEditWeight} />
                        <p>Price </p>
                        <InputNumber min={0} max={10000} defaultValue={this.state.priceEdit} onChange={this.changeEditPrice} />
                        <p>Count </p>
                        <InputNumber min={0} max={500} defaultValue={this.state.countEdit} onChange={this.changeEditCount} />

                        <Button type='danger' style={{marginRight: '1rem'}} onClick={() => this.deleteHandler(this.state.editKey)}><i className='fa fa-trash'></i></Button>
                </Modal>
                <div className="Items__filters">
                <Button onClick={this.showAdd}>Добавить новый товар</Button>
                <Search
                    placeholder="Введите название товара"
                    size="large"
                    onChange={this.searchHandler}
                />
                </div>
                <div className="Items__content">
                    <Table columns={columns} dataSource={this.state.itemsAdd.filter(this.filterHandler(this.state.word))} />   
                </div>
            </div>
        )
    }
}

export default Items;