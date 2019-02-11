import React from 'react';
import { handleResponse } from '../helper';
import { API_URL } from '../config';
import './Table.css';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1
        }
        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount() {
        this.fetchCurrencies();
    }

    fetchCurrencies() {
        this.setState({ loading: true });

        const { page } = this.state;

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse)
            .then((data) => {
                console.log('Success', data);
                const { currencies, totalPages } = data;
                this.setState({ 
                    currencies: currencies,
                    loading: false,
                    totalPages: totalPages
                });
            })
            .catch((error) => {
                console.log('Error', error);
                this.setState({
                    error: error.errorMessage,
                    loading: false
                });
            });
    }

    renderChangePercent(percent) {
        if (percent > 0) {
            return <span className="percent-raised">{percent}% &uarr;</span>
        } else if (percent < 0) {
            return <span className="percent-fallen">{percent}% &darr;</span>
        } else {
            return <span>{percent}%</span>
        }
    }

    handlePaginationClick(direction) {
        let nextPage = this.state.page;
        nextPage = (direction === 'next') ? 
            (nextPage + 1 <= this.state.totalPages) ?  nextPage + 1 : nextPage
            :(nextPage - 1 > 0) ?  nextPage - 1 : nextPage;
        this.setState({ page: nextPage }, () => {
            this.fetchCurrencies();
        });

    }

    render() {
        // ES6:
        // const loading = this.state.loading;
        // const error = this.state.error;
        // const currencies = this.state.currencies;

        const { loading, error, currencies, totalPages, page} = this.state;

        // Render only loading component, if loading state is set to true
        if (loading) {
            return <div className="loading-container"><Loading/></div>
        }

        // Render only error message, if error occurred while fetching data
        if(error) {
            return <div className="error">{error}</div>
        }

        return (
            <div>
                <Table 
                    currencies={currencies}
                    renderChangePercent={this.renderChangePercent}   
                />
                <Pagination 
                    totalPages={totalPages}
                    page={page}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>
        );
    }
}

export default List;
