import { enqueueSnackbar } from "notistack"

export default (error) =>{
  // console.log(error)
  enqueueSnackbar(error.response.data.error, { variant: "error" })
}
