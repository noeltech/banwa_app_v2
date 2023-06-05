import React from "react";
import mapboxgl from "mapbox-gl";
import RangeSlider from "./RangeSlider";
import { switchPopulationDate } from "./Utilities";
import { lowestPopulation, highestPopulation } from "./Data";
import Legend from "./Legend";
import PopulationCount from "./PopulationCount";
import ChartBox from "./ChartBox";

mapboxgl.accessToken =
  "pk.eyJ1Ijoibm9lbHRlY2giLCJhIjoiY2o2azRiazZ2MTVlZDMxbXdvdTU1OW03YSJ9.eYd9NVbg2cgcrAqs0da8eA";
let hoveredStateId = null;
class PopulationMap extends React.Component {
  state = {
    style: "mapbox://styles/noeltech/cjjku7xsx0vay2spj959b5p5s",
    lng: 122.55,
    lat: 10.726,
    zoom: 12.3,
    pitch: 60,
    rangeSliderValue: 0,
    highestPopulation: highestPopulation,
    lowestPopulation: lowestPopulation,
    year: 1970,
    totalPopulation: 209738,
    chartVisibility: true,
    legendVisibility: true
  };

  handleSliderChange = rangeClickValue => {
    const populationDate = switchPopulationDate(rangeClickValue);
    this.setState({
      rangeSliderValue: rangeClickValue,
      year: populationDate[2],
      totalPopulation: populationDate[1]
    });

    this.handleStyleChange(rangeClickValue);
  };
  handleStepperNext = () => {
    const populationDate = switchPopulationDate(
      this.state.rangeSliderValue + 1
    );
    this.setState(state => ({
      rangeSliderValue: state.rangeSliderValue + 1,
      year: populationDate[2],
      totalPopulation: populationDate[1]
    }));
    this.handleStyleChange(this.state.rangeSliderValue + 1);
    this.populationSwitch(this.state.rangeSliderValue + 1);
  };

  handleStepperBack = () => {
    const populationDate = switchPopulationDate(
      this.state.rangeSliderValue - 1
    );
    this.setState(state => ({
      rangeSliderValue: state.rangeSliderValue - 1,
      year: populationDate[2],
      totalPopulation: populationDate[1]
    }));
    this.handleStyleChange(this.state.rangeSliderValue - 1);
    this.populationSwitch(this.state.rangeSliderValue - 1);
  };

  handleStyleChange = value => {
    const populationDate = switchPopulationDate(value);
    const map = this.map;
    map.setPaintProperty("iloilo_city_barangay_3d", "fill-extrusion-color", [
      "interpolate",
      ["linear"],
      ["get", populationDate[0]],
      1000,
      "hsl(60, 100%, 95%)",
      2000,
      "hsl(53, 100%, 87%)",
      3000,
      "hsl(45, 98%, 78%)",
      4000,
      "hsl(40, 99%, 65%)",
      5000,
      "hsl(32, 99%, 58%)",
      6000,
      "hsl(26, 85%, 50%)",
      8000,
      "hsl(22, 98%, 40%)",
      10000,
      "hsl(19, 95%, 31%)",
      13000,
      "hsl(19, 89%, 21%)"
    ]);
    map.setPaintProperty("iloilo_city_barangay_3d", "fill-extrusion-height", [
      "interpolate",
      ["linear"],
      ["get", populationDate[0]],
      1000,
      100,
      3000,
      300,
      5000,
      500,
      7000,
      700,
      9000,
      900,
      12000,
      1200,
      15000,
      1500
    ]);
  };

  getBarangaylist = populationDate => {
    const features = this.map.queryRenderedFeatures({
      layers: ["iloilo_city_barangay_3d"]
    });
    // const features = this.map.querySourceFeatures("iloilo_city_barangay_3d", {
    //   sourceLayer: "IloiloCityBarangay_toMapbox-bafzbm"
    // });

    let barangayList = [];
    features.map(feature => {
      barangayList.push({
        barangayName: feature.properties.BarangayName,
        population: feature.properties[populationDate]
      });
    });

    return barangayList;
  };

  getHighestPopulation = barangayList => {
    return barangayList
      .sort((a, b) => {
        return b.population - a.population;
      })
      .slice(0, 5);
  };

  getLowestPopulation = barangayList => {
    return barangayList
      .filter(list => list.population !== 0)
      .sort((a, b) => a.population - b.population)
      .slice(0, 5);
  };

  populationSwitch = rangeValue => {
    const populationDate = switchPopulationDate(rangeValue);
    const barangayList = this.getBarangaylist(populationDate[0]);
    const highestPopulation = this.getHighestPopulation(barangayList);
    const lowestPopulation = this.getLowestPopulation(barangayList);
    this.setState({
      lowestPopulation: lowestPopulation,
      highestPopulation: highestPopulation
    });
  };

  highlightFeature = e => {
    if (hoveredStateId) {
      this.map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "IloiloCityBarangay_toMapbox-bafzbm",
          id: hoveredStateId
        },
        { hover: false }
      );
    }
    hoveredStateId = e.features[0].id;
    this.map.setFeatureState(
      {
        source: "composite",
        sourceLayer: "IloiloCityBarangay_toMapbox-bafzbm",
        id: hoveredStateId
      },
      { hover: true }
    );
  };

  removeHighlight = () => {
    if (hoveredStateId) {
      this.map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "IloiloCityBarangay_toMapbox-bafzbm",
          id: hoveredStateId
        },
        { hover: false }
      );
    }
    hoveredStateId = null;
  };

  // shouldComponentUpdate(nextProps, nextState){
  //     if (this.state.hoveredStateId !== nextState.hoveredStateId){
  //         return false
  //     } else return true
  // }
  popupFeatureInfo(e, barangayName, populationValue, popup) {
    const itemDescription = `<h4>Brgy. ${barangayName}</h4>
                                 <h4>Population : ${populationValue}</h4> `;
    popup
      .setLngLat(e.lngLat)
      .setHTML(itemDescription)
      .addTo(this.map);
  }
  toggleChartVisibility = () => {
    if (this.state.chartVisibility === false) {
      this.setState({ chartVisibility: true });
    } else {
      this.setState({ chartVisibility: false });
    }
  };
  toggleLegendVisibility = () => {
    if (this.state.legendVisibility === false) {
      this.setState({ legendVisibility: true });
    } else {
      this.setState({ legendVisibility: false });
    }
  };

  handleWidthChange = () => {
    if (innerWidth > 960 && this.state.chartVisibility === false) {
      this.setState({ chartVisibility: true });
    } else if (innerWidth < 960) {
      this.setState({ chartVisibility: false });
    }
    if (innerWidth > 960 && this.state.legendVisibility === false) {
      this.setState({ legendVisibility: true });
    } else if (innerWidth < 960) {
      this.setState({ legendVisibility: false });
    }
  };

  //   generateNumberSequence = (oldNumber, newNumber) =>  {
  //         let step
  //         if (oldNumber < newNumber){
  //             for (step = oldNumber; step <= newNumber; step++) {
  //                 this.setState({totalPopulation: step})
  //             }
  //         }
  //   }

  correctZoom = zoom => {
    if (innerWidth <= 600) {
      return 11.5;
    } else {
      return zoom;
    }
  };
  componentDidMount() {
    const { lng, lat, zoom, pitch } = this.state;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: this.state.style,
      center: [lng, lat],
      zoom: this.correctZoom(zoom),
      bearing: -40,
      pitch
      // attributionControl: false
    });
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    this.map.on("mousemove", "iloilo_city_barangay_3d", e => {
      this.map.getCanvas().style.cursor = "pointer";
      if (e.features.length > 0) {
        const barangayName = e.features[0].properties.BarangayName;

        const propertyValue = switchPopulationDate(this.state.rangeSliderValue);
        const populationValue = e.features[0].properties[propertyValue[2]];
        this.highlightFeature(e);
        this.popupFeatureInfo(e, barangayName, populationValue, popup);
      }
    });

    window.addEventListener("resize", this.handleWidthChange);
    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    this.map.on("mouseleave", "iloilo_city_barangay_3d", () => {
      this.map.getCanvas().style.cursor = "";
      this.removeHighlight();
      popup.remove();
    });

    this.handleWidthChange();
  }

  componentWillUnMount() {
    window.removeEventListener("resize", this.handleWidthChange);
  }
  render() {
    return (
      <div
        style={{
          flexGrow: "1",
          display: "flex",
          position: "relative",
          flexDirection: "column"
        }}
      >
        <div
          ref={el => (this.mapContainer = el)}
          className="webmap"
          style={{ flexGrow: "1" }}
        ></div>
        <RangeSlider
          handleNext={this.handleStepperNext}
          handleBack={this.handleStepperBack}
          currentValue={this.state.rangeSliderValue}
          onSliderChange={this.handleSliderChange}
          populationSwitch={this.populationSwitch}
        />
        <ChartBox
          chartVisibility={this.state.chartVisibility}
          highChartLimit={this.state.highestPopulation[0].population}
          highPopulation={this.state.highestPopulation}
          lowPopulation={this.state.lowestPopulation}
          lowChartLimit={this.state.lowestPopulation[4].population / 0.5}
          onClick={this.toggleChartVisibility}
        />
        <Legend
          legendVisibility={this.state.legendVisibility}
          onClick={this.toggleLegendVisibility}
        />
        <PopulationCount
          year={this.state.year}
          totalPopulation={this.state.totalPopulation}
        />
      </div>
    );
  }
}

export default PopulationMap;
