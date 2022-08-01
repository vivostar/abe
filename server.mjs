import express, { json } from 'express'
import shell from 'shelljs'
const app = express()

app.use(json())

//get all members
app.get('/api/create', (req, res) => {

  let spark_submit_cmd = `/opt/spark/bin/spark-submit `
  spark_submit_cmd = `${spark_submit_cmd}--class ${req.query['class']} `
  for (let config of req.body['conf']) {
    spark_submit_cmd = spark_submit_cmd + '--conf ' + config['configName'] + '=' + config['configValue'] + ' '
  }
  spark_submit_cmd = spark_submit_cmd + req.body['jar'] + ' ' + req.body['args']
  console.log(spark_submit_cmd)
  const test = shell.exec(spark_submit_cmd)
  res.json({"test": {"output": test}})
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`))
