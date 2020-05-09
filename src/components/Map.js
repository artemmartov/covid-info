import React, { Component } from "react";
import AmCharts from "@amcharts/amcharts3-react";
import { connect } from "react-redux";
import classes from "../components/mainMap.module.css";
import { asyncGetTracks } from "../redux/actions/actions";
import "./Map.css";


class Map extends Component {
 
  async getDataRest(country) {
    const response = await fetch(
      `http://localhost:7000/news?country=${country}`
    );
    const json = await response.json();
    return json;
  }

  async componentDidMount() {
    AmCharts.makeChart("chartdiv", {
      type: "map",
      pathToImages: "http://www.amcharts.com/lib/3/images/",
      addClassNames: true,
	  fontSize: 15,
	//   handDrawThickness: 10,
	//   handDrawn: true,
      color: "#FFFFFF",
      projection: "mercator",
      backgroundAlpha: 1,
      backgroundColor: "#fff",
      dataProvider: {
        map: "worldLow",
        getAreasFromMap: true,
        images: [
          {
            top: 40,
            left: 60,
            width: 80,
            height: 40,
            pixelMapperLogo: true,
            imageURL: "http://pixelmap.amcharts.com/static/img/logo.svg",
            url: "http://www.amcharts.com"
          }
        ]
      },
      balloon: {
        horizontalPadding: 15,
        borderAlpha: 0,
        borderThickness: 1,
        verticalPadding: 15
      },
      areasSettings: {
        color: "#0EA9EC",
        outlineColor: "#0B82B5",
        rollOverColor: "#CCECFA",
        rollOverOutlineColor: "#fff",
        rollOverBrightness: 20,
        selectedBrightness: 100,
        selectable: true,
        unlistedAreasAlpha: 0,
		unlistedAreasOutlineAlpha: 0,
		strokeWidth: 5
      },
      imagesSettings: {
        alpha: 1,
        color: "rgba(129,129,129,1)",
        outlineAlpha: 0,
        rollOverOutlineAlpha: 0,
        outlineColor: "rgba(80,80,80,1)",
        rollOverBrightness: 20,
        selectedBrightness: 20,
        selectable: true
      },
      linesSettings: {
        color: "rgba(129,129,129,1)",
        selectable: true,
        rollOverBrightness: 20,
        selectedBrightness: 20
      },
      zoomControl: {
        zoomControlEnabled: true,
        homeButtonEnabled: false,
        panControlEnabled: false,
        right: 38,
        bottom: 30,
        minZoomLevel: 0.25,
        gridHeight: 100,
        gridAlpha: 0.1,
        gridBackgroundAlpha: 0,
        gridColor: "#FFFFFF",
        draggerAlpha: 1,
        buttonCornerRadius: 2
      }
    });
  }

  render() {

    const { onGetTracks } = this.props;
    return (
      <React.Fragment>
        <div
          onMouseDown={onGetTracks}
          id="chartdiv"
          className={classes.map}
        ></div>
        {this.props.children}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    country: state.country,
    input: state.input
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetTracks: e => {
      dispatch(asyncGetTracks(e.target.getAttribute("aria-label")));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
