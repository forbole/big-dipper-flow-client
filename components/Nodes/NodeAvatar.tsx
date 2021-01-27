import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Jdenticon from 'react-jdenticon';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        profileBox:{
            display: 'flex',
            alignItems: 'center',
            '& svg':{
                marginRight: '1rem'
            }
        },
        profileImage: {
            width: '2.5rem',
            height: '2.5rem',
            marginRight: '1rem'
        }
    }),
)

type AvatarProps = { 
    name: string,
    profileImage?: string,
    url?: string,
    nodeId: string
}

export const NodeAvatar = ({name, profileImage, url, nodeId}: AvatarProps) => {
    const classes = useStyles()
    const image = (profileImage != '')?<img src={profileImage} className={classes.profileImage} />:<Jdenticon size="40" value={nodeId} />
    const link = (url != '')?<a href={url}>{name}</a>:<span>{name}</span>
    return <div className={classes.profileBox}>
        {image}
        {link}
    </div>
}