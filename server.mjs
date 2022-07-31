import express, { json } from 'express'
import { $ } from 'zx'
const app = express()

app.use(json())

const shellRunner = async (cmd) => {
  return await $`${cmd}`
}
//get all members
app.get('/api/create', (req, res) => {

  let spark_submit_cmd = `spark-submit --conf `
  for (let config of req.body['conf']) {
    spark_submit_cmd = spark_submit_cmd + config['configName'] + '=' + config['configValue'] + ' '
  }
  spark_submit_cmd = spark_submit_cmd + req.body['jar'] + ' ' + req.body['args']
  console.log(spark_submit_cmd)
  const test = shellRunner(spark_submit_cmd)
  res.json({"test": "yes"})
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`))
