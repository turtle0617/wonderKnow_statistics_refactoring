<template>
<div class="chartTest">
  <div id="chart">
    <h1>每月統計:</h1>
    <ve-line :data="all_Month_Talk" :data-zoom="dataZoom()" :after-set-option="afterOption" id="test"></ve-line>
    <ve-line :data="all_Month_Talk"  :after-set-option="controlledOption" id="test"></ve-line>
  </div>
</div>
</template>

<script>
export default {
  name: "chartTest",
  data: function() {
    return {
      otherChart: [],
      all_Month_Talk: {
        columns: ["month", "month_talks_count"],
        rows: [
          {
            month: "2017-06",
            month_talks_count: 2
          },
          {
            month: "2017-07",
            month_talks_count: 0
          },
          {
            month: "2017-08",
            month_talks_count: 8
          },
          {
            month: "2017-09",
            month_talks_count: 10
          },
          {
            month: "2017-10",
            month_talks_count: 7
          },
          {
            month: "2017-11",
            month_talks_count: 18
          },
          {
            month: "2017-12",
            month_talks_count: 15
          },
          {
            month: "2018-01",
            month_talks_count: 14
          },
          {
            month: "2018-02",
            month_talks_count: 1
          },
          {
            month: "2018-03",
            month_talks_count: 19
          },
          {
            month: "2018-04",
            month_talks_count: 9
          },
          {
            month: "2018-05",
            month_talks_count: 8
          },
          {
            month: "2018-06",
            month_talks_count: 12
          },
          {
            month: "2018-07",
            month_talks_count: 15
          },
          {
            month: "2018-08",
            month_talks_count: 12
          },
          {
            month: "2018-09",
            month_talks_count: 5
          },
          {
            month: "2018-10",
            month_talks_count: 0
          }
        ]
      }
    };
  },
  mounted: function() {
    // var canvas = document.getElementsByClassName("ve-line");
    // // var ctx = canvas.getContext('2d');
    // // let myChart = VCharts.VeChart.init(document.getElementsByClassName('ve-line'));
    // canvas[0].addEventListener("mousedown", e => {
    //   console.log(e);
    // });
  },
  methods: {
    dataZoom: function() {
      return [
        {
          type: "slider",
          show: true,
          start: 20,
          end: 35
        }
      ];
    },
    controlDataZoom: function(startPoint, endPoint) {
      let changeSlide = {
        dataZoom: [
          {
            type: "slider",
            show: false,
            start: startPoint,
            end: endPoint
          }
        ]
      };
      this.otherChart.setOption(changeSlide);
      // window.onresize = function() {
      //   this.otherChart.resize();
      // };
    },
    afterOption: function(echarts) {
      let startPoint;
      let endPoint;
      echarts.on("dataZoom", params => {
        startPoint = parseInt(params.start);
        endPoint = parseInt(params.end);
        this.controlDataZoom(startPoint, endPoint);
      });
    },
    controlledOption: function(echarts) {
      this.otherChart = echarts;
    }
  }
};
</script>
