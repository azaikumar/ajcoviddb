import {PieChart, Pie, Legend, Cell} from 'recharts'

// const data = [
//   {
//     count: 809680,
//     language: 'Telugu',
//   },
//   {
//     count: 4555697,
//     language: 'Hindi',
//   },
//   {
//     count: 12345657,
//     language: 'English',
//   },
// ]

const VaccinationByGender = props => {
  const {vaccinationByGenderList} = props

  return (
    <div className="pie-wrap">
      <h1 className="sub-heading">Vaccination by gender</h1>
      {/* <ResponsiveContainer width="100%" height={300} className="container"> */}
      <PieChart width={400} height={300}>
        <Pie
          cx="50%"
          cy="40%"
          data={vaccinationByGenderList}
          startAngle={0}
          endAngle={180}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill="#fecba6" />
          <Cell name="Female" fill="#b3d23f" />
          <Cell name="Others" fill="#a44c9e" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="middle"
          horizontalAlign="left"
        />
      </PieChart>
      {/* </ResponsiveContainer> */}
    </div>
  )
}
export default VaccinationByGender
