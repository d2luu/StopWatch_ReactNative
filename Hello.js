import React from 'react'
import {
    View, Text, StyleSheet, Image, TextInput, Alert,
    TouchableOpacity, ScrollView, FlatList, SectionList, ActivityIndicator,
    StatusBar
} from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HelloWorld extends React.Component {
    constructor() {  // A
        super();
        console.log("constructor");
        this.state = {
            name: 'Hello Luu Manh',
            text: '',
            isLoading: true,
            isRunning: false,
            lapse: 0
        };
        this.changeName = this.changeName.bind(this);
        this.translate = this.translate.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this._onPressButton = HelloWorld._onPressButton.bind(this)
    }

    componentWillMount() {
        console.log("will mount")
    }

    componentDidMount() { // D
        console.log('mounted..');
        return fetch('https://facebook.github.io/react-native/movies.json')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.movies
                    })
                })
                .catch((error) => {
                    console.error(error);
                });
    }

    changeName() {
        this.state.name === 'Hello Luu Manh'
            ? this.setState({name: "今日は リュー君"})
            : this.setState({name: "Hello Luu Manh"})
    }

    static _onPressButton() {
        Alert.alert("ボタンクリック!")
    }

    translate = (text) => {
        this.setState({
            text: text
        })
    };

    handlePress = () => {
        this.setState((prevState) => {
            if (this.state.isRunning) {
                clearInterval(this.timer)
            } else {
                const startTime = Date.now() - this.state.lapse;
                this.timer = setInterval(() => {
                    this.setState({lapse: Date.now() - startTime})
                });
            }
            return { isRunning: !prevState.isRunning }
        })
    };

    handleClear = () => {
        clearInterval(this.timer);
        this.setState({
            isRunning: false,
            lapse: 0
        })
    };

    render() { // C
        console.log("render");
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        let data = [
            {key: 'Luu'},
            {key: 'Manh'},
            {key: 'An'},
            {key: 'Nhanh'},
            {key: 'Hoa'},
            {key: 'Bi'},
            {key: 'Cp'},
            {key: '94'},
            {key: 'Abc'}
        ];
        let testSection = [
            {title: 'Title1', data: ['item1', 'item2']},
            {title: 'Title2', data: ['item3', 'item4']},
            {title: 'Title3', data: ['item5', 'item6']},
        ];
        let sections = [
            {title: 'Title1', data: ['item1', 'item2']},
            {title: 'Title2', data: ['item3', 'item4']},
            {title: 'Title3', data: ['item5', 'item6']},
            {title: 'D', data: ['Devin', 'Dao']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
        ];
        // let listMovies = this.fetchData();
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <View style={{
                    flex: 2,
                    flexDirection: "row",
                }}>
                    <View style={{
                        flex: 0.5,
                        backgroundColor: 'powderblue',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{fontSize: 80}}>1</Text>
                    </View>
                    <SectionList
                        style={{flex: 1}}
                        sections={sections}
                        renderItem={
                            ({item}) => <Text style={styles.item}>{item}</Text>
                        }
                        renderSectionHeader={
                            ({section}) => <Text
                                style={{backgroundColor: '#e6f2ff', fontWeight: 'bold'}}>{section.title}</Text>
                        }
                        keyExtractor={
                            (item, index) => index
                        }
                    />


                    <FlatList
                        style={{backgroundColor: '#66ccff', flex: 1}}
                        data={this.state.dataSource}
                        renderItem={({item}) => <Text style={styles.item}>{item.title}, {item.releaseYear}</Text>}
                        keyExtractor={(item, index) => index}
                    />

                    <TouchableOpacity style={{
                        flex: 0.5,
                        backgroundColor: 'steelblue',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View>
                            <Text style={{fontSize: 80}}>2</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                {/*<View style={{flex: 1, flexDirection: "column", alignItems: 'center'}}>
                    <Image source={pic}
                           style={{flex: 1, alignSelf: 'stretch'}}
                    />
                    <Image source={pic}
                           style={{flex: 1,alignSelf: 'stretch'}}
                    />
                </View>*/}

                <View style={{flex: 3, backgroundColor: '#c3ff6c', flexDirection: 'column'}}>
                    <View style={{marginTop: 40, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Button
                                buttonStyle={{
                                    backgroundColor: "rgba(92, 99,216, 1)",
                                    width: 90,
                                    height: 45,
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius: 5,
                                }}
                                title = {this.state.isRunning ? 'Stop' : 'Start'}
                                onPress={this.handlePress}
                            />
                            <Button
                                buttonStyle={{
                                    backgroundColor: "rgba(92, 99,216, 1)",
                                    width: 90,
                                    height: 45,
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius: 5
                                }}
                                title='Clear'
                                onPress={this.handleClear}
                            />
                        </View>

                        <Text style={{marginTop: 50, fontSize: 50}}>
                            {this.state.lapse}ms
                        </Text>
                    </View>

                   {/* <Text style={styles.hello}>{this.state.name}</Text>

                    <Button
                        onPress={this.changeName}
                        title="Click me to change name"
                        color="red"
                        style={styles.welcome}
                    />*/}

                   {/* <View style={{flex: 1, flexDirection: "row", alignItems: 'center'}}>
                        <Text style={{flex: 1, fontSize: 20}}>
                            Trans:
                        </Text>
                        <TextInput
                            style={{flex: 5, height: 50, fontSize: 20}}
                            placeholder="Type here to translate!"
                            onChangeText={this.translate}
                        />
                    </View>

                    <Text style={{padding: 10, fontSize: 42, flex: 1}}>
                        {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
                    </Text>*/}

                   {/* <TouchableOpacity onLongPress={this._onPressButton} underlayColor="white">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>TouchableOpacity Long Press</Text>
                        </View>
                    </TouchableOpacity>

                    <XinChao name={"Hoa Bi"} style={{flex: 1}}/>*/}
                </View>
            </View>
        )
    }
}

class XinChao extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingText: true
        };

        setInterval(() => {
            this.setState(prevState => {
                return {isShowingText: !prevState.isShowingText}
            })
        }, 1000)
    }

    render() {
        let text = this.state.isShowingText ? `Hello ${this.props.name}` : '';
        return (
            <Text style={styles.hello}>{text}</Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    welcome: {
        flex: 1,
        fontSize: 50,
        textAlign: 'center',
        margin: 10,
        color: 'red',
        fontWeight: 'bold',
        backgroundColor: 'red'
    },
    hello: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
        color: '#009900'
    },
    red: {
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
        color: 'black'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        textAlign: 'center'
    },

});
