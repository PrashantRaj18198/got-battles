import React, { useState, useEffect, useRef } from 'react';
import { allLocations, battleDetailsByLocation } from './BattlesByLocationAPI';
import BattleInfoTable from '../BattleInfoTable/BattleInfoTable';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import './BattlesByLocation.css';

const BattlesByLocation = (props) => {
    // ref for search bar
    const locationRef = useRef('');
    // list of locations used for suggestions
    const [locations, setLocations] = useState([]);
    // list of all the battles at the selected location
    // passed to BattleInfoTable component to populate
    // a table using the data.
    const [battleData, setBattleData] = useState([]);

    // async function for setLocations
    const getData = async () => {
        // allLocations is api endpoint which
        // return all the possible locations
        setLocations(await allLocations());
    }

    // runs when you click on submit button    
    const handleClick = async (event) => {
        // sends the location to this api endpoint which returns list of battles
        // that have taken place at the current location
        // so, just await and set the battle data to the returned value
        setBattleData(await battleDetailsByLocation(locationRef.current.value));
    }

    // useEffect to do getData
    // when the component first renders
    // works just like componentdidmount
    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Container maxWidth="sm" className="container">
                
                <Typography variant="h2">
                    Details of battles based on the location
                </Typography>
                
                <div className="inner-container">
                    {/* material ui autocomplete with textbox to make suggestions */}
                    <Autocomplete
                        fullWidth
                        id="combo-box-demo"
                        // provide all the options
                        options={locations}
                        // provide the option labels
                        getOptionLabel={option => option}
                        renderInput={
                            (params) => (
                                <TextField
                                    {...params}
                                    label="Combo box"
                                    variant="outlined"
                                    // pass ref to locationRef
                                    inputRef={locationRef}
                                    fullWidth
                                />
                        )}
                    />
                    
                    <Button variant="contained" color="primary" style={{marginTop: '25px', width: '30%'}} onClick={handleClick}>
                        Submit
                    </Button>

                </div>
            </Container>
            {/* pass battleData to make the table
                if the battleData is empty an empty table is
                rendered
             */}
            <Container maxWidth='md' className='container'>
                <BattleInfoTable data={battleData}/>
            </Container>

        </div>
    )
}

export default BattlesByLocation;