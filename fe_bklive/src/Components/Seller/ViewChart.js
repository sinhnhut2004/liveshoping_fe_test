import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';

function ViewChart() {
  const categories0 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const refContainer = useRef(null);
  const [dataSource, setDataSource] = useState([]);
  const [text, setText] = useState("");
  const [categories, setCategories] = useState(categories0);
  const [num, setNum] = useState(0);
  const [data, setData] = useState([0, 0, 0]);

  const [data10, setData10] = useState(0);
/////////////

const getData = async () => {

  const options1 = {
    method: "GET",
    headers: {
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI3MzIzNzljMi1kNzJkLTQzYzktOGE4MS1lYWJmMDY0OGJlYmIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5MDYwMjE3NSwiZXhwIjoxNjkxMjA2OTc1fQ.8FDboR7_6xtfrmNIEd7jsZD5-x9F-bC8Rm-PWxjrSE0",
      "Content-Type": "application/json",
    },
  };

  // const options2 = {
  //   method: "POST",
  //   headers: {
  //     "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI3MzIzNzljMi1kNzJkLTQzYzktOGE4MS1lYWJmMDY0OGJlYmIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5MDYwMjE3NSwiZXhwIjoxNjkxMjA2OTc1fQ.8FDboR7_6xtfrmNIEd7jsZD5-x9F-bC8Rm-PWxjrSE0",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({"roomId" : "jadg-rj98-5as8"}),
  // };



  // const url= `https://api.videosdk.live/v2/hls/?roomId=u83b-i2p2-2hjf`;
  // const sessionId = "64bcb3f0d66bb4b744ea4d1b";
  const session = `https://api.videosdk.live/v2/sessions/`;
  
  const responseSession = await fetch(session, options1);
  const dataSession = await responseSession.json();
  
  // const startHls= `https://api.videosdk.live/v2/hls/start`;

  // const stopHls = `https://api.videosdk.live/v2/hls/end`;

  // const responseHls1 = await fetch(startHls, options2);

  // const responseHls2 = await fetch(stopHls, options2);

  // Lấy số lượt view hiện tại (fech session sau đó fech lượt view hiện tại)
  const sessionId = dataSession.data[0].id;
  const viewNumber = `https://api.videosdk.live/v2/sessions/${sessionId}/participants/active?page=1&perPage=20`;
  const response2 = await fetch(viewNumber, options1);
  const responseView = await response2.json();

  // return data2.data[0].participants.length;
  setData10(responseView.data[0].participants.length);

  } 

  // const startHls = async () => {
  //   const options2 = {
  //     method: "POST",
  //     headers: {
  //       "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI3MzIzNzljMi1kNzJkLTQzYzktOGE4MS1lYWJmMDY0OGJlYmIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5MDYwMjE3NSwiZXhwIjoxNjkxMjA2OTc1fQ.8FDboR7_6xtfrmNIEd7jsZD5-x9F-bC8Rm-PWxjrSE0",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({"roomId" : "jadg-rj98-5as8"}),

  //   };
  //   const startHls= `https://api.videosdk.live/v2/hls/start`;
  //   const responseHls1 = await fetch(startHls, options2);

  // }
 
  // bắt đầu livestream

  // startHls();
////////////////

  useEffect(() => {
    const chart = Highcharts.chart(refContainer.current, {
      chart: {
        type: 'line',
        backgroundColor: "rgb(217, 217, 217)",
      }, // type of the chart
      title: {
        text: text
      }, // title of the chart
      subtitle: {
        text: 'View in livestream'
      }, // subtitle of the chart
      yAxis: {
        title: {
          text: 'View'
        }, // the title of the Y Axis
      },
      xAxis: {
        min: 0.4,
        // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        title: {
          text: 'Time'
        } // the title of the X Axis
      },
      tooltip: {
        headerFormat: '<span style="font-size:13px;font-weight:bold;">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      }, // tooltip appears when hovering over a point
      credits: {
        enabled: false
      },
      series: dataSource // set of the data
    });

    if (dataSource.length > 0) {
      chart.hideLoading();
    }
    else {
      chart.showLoading();
    }
  }, [dataSource]);

  
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
  
  useEffect(() => {
    
    setTimeout(()=>{
      // addData();
      getData();
      setNum(getRndInteger(50, 1000));
      // setNum(num + 0 )
      if(data10 > 0)
      {
        data.push(data10 - 1);
      }
      else {
        data.push(data10);
      }

      
      }, 2000);
      setDataSource([{
        name: 'Biểu đồ lượt xem',
        data: data
      }
    ]);
    
  }, [num]);



  return (
    <div className="viewchart">
      {/* <h3>View in livestream</h3> */}
      <div ref={refContainer} />
    </div>
  );
}

export default ViewChart;