import React, {useEffect, useState} from 'react';

import withLoader from '../withLoader';

import './style.scss';
import Pagination from "../pagination";
import {useSelector} from "react-redux";
import Spinner from "../Spinner";

const Table = props => {
    const [sortConfig, setSortConfig] = useState(null);
    const isFetching = useSelector(state => state.commonFlags.isFetching);

    // useEffect(() => {
    //     if (sortConfig) {
    //         props.setSortingField ? props.setSortingField(sortConfig) : null
    //     }
    // }, [sortConfig])
    //
    // useEffect(() => {
    //     if (props.parentSortConfig && !props.parentSortConfig.sortField) {
    //         setSortConfig(null);
    //     }
    // }, [props.parentSortConfig]);

    const setSortingField = (value) => {
        let direction = 1;
        let config = {};
        config.sortField = value;

        if (sortConfig && sortConfig.sortField === value) {
            config.sortDirection = sortConfig.sortDirection === 1 ? -1 : 1
        } else {
            config.sortDirection = direction
        }
        setSortConfig(config);
    }

    return (
        <>
            <div
                className='table-container'
                style={props.style || {}}
            >
                <table className='table'>
                    <thead className={`thead ${props.sort ? 'theadSort' : null}`}>
                    <tr className='tr'>
                        {props.options.map((option, i) => (
                            <th
                                className={`th${option.className ? ` ${option.className}` : ''} ${option.name !== 'actions'}`}
                                style={option.name === 'actions' || option.name === 'users' ? {cursor: 'default'} : null}
                                key={i}
                                onClick={() => (option.name === 'actions' || option.name === 'users') ? null : setSortingField(option.name)}
                            >
                                {option.value}
                                {(props.sort && sortConfig && option.name === sortConfig.sortField)
                                    ? (sortConfig.sortDirection && sortConfig.sortDirection === 1) ? ' ↑' : ' ↓'
                                    : null}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    {!isFetching && (
                        <tbody className='tbody'>
                        {props.rows.map(item => (
                            <tr
                                className='tr'
                                key={item._id || item.id || item.gamerId}
                            >
                                {props.options.map((option, j) => (
                                    <td
                                        className={`td${
                                            option.className ? ` ${option.className}` : ''
                                        }`}
                                        style={item[option.name] instanceof Array ? {'whiteSpace': 'pre-line'} : null}
                                        key={`${item._id}-${j}`}
                                    >
                                        {item[option.name] instanceof Array
                                            ? item[option.name].map(el => el + '\n')
                                            : item[option.name]
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    )}
                </table>
                {!isFetching && props.filter && !props.rows.length && (
                    <div className='noFound'>
                        <p>Nothing found</p>
                    </div>
                )}
                {isFetching && (
                    <div className='spinner-container'>
                        <Spinner/>
                    </div>
                )}
            </div>
            {/*{!isFetching && (*/}
            {/*    <Pagination count={props.totalAmount}/>*/}
            {/*)}*/}
        </>
    )
}

export default withLoader(Table);
