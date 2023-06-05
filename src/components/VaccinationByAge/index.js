import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationByAgeList} = props

  return (
    <div>
      <h1 className="sub-heading">Vaccination by Age</h1>
      {/* <ResponsiveContainer width="100%" height={300} className="container"> */}
      <PieChart width={400} height={300}>
        <Pie
          cx="50%"
          cy="40%"
          data={vaccinationByAgeList}
          startAngle={0}
          endAngle={360}
          innerRadius="0%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#fecba6" />
          <Cell name="44-60" fill="#b3d23f" />
          <Cell name="Above 60" fill="#a44c9e" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          horizontalAlign="left"
        />
      </PieChart>
      {/* </ResponsiveContainer> */}
    </div>
  )
}
export default VaccinationByAge
