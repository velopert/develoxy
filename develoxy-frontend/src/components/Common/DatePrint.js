import React from 'react';

const monthName = {
    1: 'JAN',
    2: 'FEB',
    3: 'MAR',
    4: 'APR',
    5: 'MAY',
    6: 'JUN',
    7: 'JUL',
    8: 'AUG',
    9: 'SEP',
    10: 'AUG',
    11: 'NOV',
    12: 'DEC'
};

const DatePrint = ({date = new Date()}) => {
    return (
        <span>
            {monthName[date.getMonth()]} {("0"+date.getDate()).slice(-2)}. {date.getFullYear()}
        </span>
    );
};

export default DatePrint;