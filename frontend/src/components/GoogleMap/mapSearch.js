import React from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import AddJobPost from "../JobBoardPage/add-jobPost.component";


/** Search for places */
export default function SearchLocation(props) {
    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null
    })

    const handleSelect = async (value) => {
        /**
         * Get name of the location and its latitude and longitude
         * 
         * @param {string} value a name of the location
         */
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
        
        /** pass location and latlng info to add-jobPost page */
        props.callData(value, latLng); 
    }


    return (
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input className="form-control" {...getInputProps({ placeholder: "Type address" })} />

                        <div>
                            {loading ? <div>...loading</div> : null}

                            {suggestions.map((suggestion) => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#3399FF" : "#fff"
                                }

                                return (
                                <div {...getSuggestionItemProps(suggestion, { style })}>
                                    {suggestion.description}
                                </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
    )
}