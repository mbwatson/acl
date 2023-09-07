import { Map, MapProvider } from './components/map'
import { Sidebar } from './components/sidebar'
import { Footer } from './components/footer'

//

export const App = () => {

  return (
    <MapProvider>
      <main>
        <aside className="sidebar">
          <Sidebar />
        </aside>
        <div className="map-container">
          <Map />
        </div>
      </main>

      <Footer />
    </MapProvider>
  )
}
