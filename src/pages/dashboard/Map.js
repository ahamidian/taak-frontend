import React, {Component} from 'react';
import Mapir from "mapir-react-component";


const Mapi = Mapir.setToken({
    transformRequest: (url) => {
        return {
            url: url,
            headers: {
                'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc2MDhjZTE5MmY1MjJhMjEwNzg5ODcwNWRmZTBkM2VmNmVmMmJiMGI4YWFjOTNlYjZhNzJjNjZiMzk3OGQ5NDJhZWY4MDk4MzJjZTk5NGM0In0.eyJhdWQiOiI3NjQxIiwianRpIjoiNzYwOGNlMTkyZjUyMmEyMTA3ODk4NzA1ZGZlMGQzZWY2ZWYyYmIwYjhhYWM5M2ViNmE3MmM2NmIzOTc4ZDk0MmFlZjgwOTgzMmNlOTk0YzQiLCJpYXQiOjE1Nzk2OTc0NjgsIm5iZiI6MTU3OTY5NzQ2OCwiZXhwIjoxNTgyMjAzMDY4LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.HXsNX1NDnrw-MWvSkfA15hv90ShDU0ht9g95fMmM8sFgu055zS-XKbjlzqXEEQaDh1VeH_MOMlGPK487cQcuKA_Wg3VdudRA-L0Xy-wNRrGXsOhUyM5TZ3gzuDl7lt4WRGYAwFgbmni2Cj3DLM57i6ExVz03QJ58i0zPhx-r_kq0hVIY7r9oP364cHkd8i9i0cbiBLxIFjA9UOkzcNdP6GP-M5rYtQwzicbdASlWcw3iEU_7FOm-ILoo-kUnXg8enzvQmrgFQlaoNiEc_GdMdFJXcIlh9HemwwWk7C3x5533ETa30Ppa12zZsLquBazV7wXxklqg_otCckw6XGmjhA', //Mapir access token
                'Mapir-SDK': 'reactjs'
            }
        }

    }
});

export default class Map extends Component {


    render() {

        return (

            <Mapir Map={Mapi} onClick={(map, e) => this.props.onClick(e.lngLat)}
                   center={[this.props.lng || 51.3841873, this.props.lat || 35.703557]}>
                <Mapir.ScaleControl/>
                <Mapir.ZoomControl/>
                <Mapir.RotationControl/>
                <Mapir.Layer
                    type="symbol"
                    layout={{"icon-image": "harbor-15"}}>

                </Mapir.Layer>
                {this.props.lat && this.props.lng && (
                    <Mapir.Marker
                        coordinates={[this.props.lng, this.props.lat]}
                        anchor="bottom">
                    </Mapir.Marker>
                )}
            </Mapir>
        )
    }

}