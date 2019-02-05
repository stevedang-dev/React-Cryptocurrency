import React from 'react';
import Header from './common/Header';
import List from './List/List';
class App extends React.Component {
    render() {

        return (
            <div>
                <Header />
                <List />
            </div>
        );
    }
}

export default App;
