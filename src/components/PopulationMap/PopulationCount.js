import React from 'react'
import {Card, Typography, withStyles, ListItem} from '@material-ui/core'
 import CountUp from 'react-countup'
const styles = (theme) => ({
    countBox : {
        position: "absolute",
        top : 5,
        left: "50%",
        marginLeft: -150,
        padding: [10],
        backgroundColor: theme.palette.primary.dark
    },
    label : {
        display : "inline-block"  
    },
    count : {
        display : "inline-block",
        paddingLeft : 5,
    
    },
    withMargin: {
        display : "inline-block",
        marginLeft : 20
    }
    
})

const PopulationCount = ({classes,year,totalPopulation}) => (
    <Card className={classes.countBox} >
            <Typography variant="subheading" className={classes.label} color="textSecondary">
                POPULATION :   
            </Typography>
            <Typography variant="title" className={classes.count} color="secondary">
                <CountUp start={200000} end={totalPopulation} delay={0}
                    separator=","
                    duration={.7}
                    >
                    {({ countUpRef }) => (
                        <div>
                        <span ref={countUpRef} />
                        </div>
                    )}
                </CountUp>
            </Typography>
            
            <Typography variant="subheading" className={classes.withMargin} color="textSecondary">
                Year :   
            </Typography>
            <Typography variant="title" className={classes.count} color="secondary">
                <CountUp start={1960} end={year} delay={0}
                    
                    duration={.5}
                    >
                    {({ countUpRef }) => (
                        <div>
                        <span ref={countUpRef} />
                        </div>
                    )}
                </CountUp>
            </Typography>
    </Card>
)


export default withStyles(styles)(PopulationCount)