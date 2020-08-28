import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';

type TableLoaderProps = { rows?: number }


const TableRows = ({rows = 10}:TableLoaderProps) => {
    let arrRows:JSX.Element[] = new Array<JSX.Element>();
    for (let i = 0; i <rows; i++) {
        arrRows.push(<Skeleton key={i} />)
    }
    return <>{arrRows}</>
}

export const TableLoader = ({rows = 10}:TableLoaderProps) => {
    return <React.Fragment>
        <TableRows rows={rows} />
    </React.Fragment>
}