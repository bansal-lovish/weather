import { CChart } from '@coreui/react-chartjs'
import React from 'react'

const Graph = (data:any) => {
  console.log(data,'data')
  const hour = data?.data?.hour?.map((item: any) => {
    // Ensure item.time is a valid Date object before using toLocaleTimeString()
    const timeString = item.time ? new Date(item.time).toLocaleTimeString([], { hour: '2-digit' }) : 'N/A';

    return timeString;
  });

  const temp=data?.data?.hour?.map((item:any)=>
    {
        return parseInt( item?.temp_c)
    }
)

  return (
    <div><CChart
    type="line"
    height={50} 
    data={{
      labels: hour??[],
      datasets: [
        {
          label: `${data?.data?.date}`,
          backgroundColor: "rgba(220, 220, 220, 0.2)",
          borderColor:"rgba(220, 220, 220, 1)",
          pointBackgroundColor: "rgba(220, 220, 220, 1)",
          pointBorderColor: "#fff",
          data: temp ??[]
        },
        
      ],
    }}
    options={{
      plugins: {
        legend: {
          labels: {
            color: '#fff',
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color:  '#fff',
          },
        },
        y: {
    
          ticks: {
            color: '#fff',
          },
        },
      },
    }}
  /></div>
  )
}

export default Graph