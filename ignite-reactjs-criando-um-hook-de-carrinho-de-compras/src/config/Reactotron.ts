import Reactotron from 'reactotron-react-js'

declare global {
  interface Console {
    tron: any
  }
}

  console.tron = Reactotron.configure()
    .connect()

  if (console.tron) {
    console.tron.clear?.()
}
