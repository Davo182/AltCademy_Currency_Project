import { Route, Link, Routes } from 'react-router-dom';
import Exchanger from './Exchanger';
import Converter from './Converter';
import './App.css';

function App() {
  return (
    <div>
      <div className="App container-fluid">
        <div className="row">
          <div className="col-12 mb-5">
            <nav className="navbar navbar-expand-lg navbar-light border border-bottom-1">
              <div className="container-fluid">
                <Link className="navbar-brand" to="/"> 💱 Currency Exchanger </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/exchanger"> Exchanger </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/convert"> Converter </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <Routes>
              <Route path="exchanger" element={<Exchanger />} />
              <Route path="convert" element={<Converter />} />
              <Route path="/" exact element={<Exchanger />} />
            </Routes>

          </div>
          <div className="col-12 mt-5">
            <footer class=" w-100 d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top bg-white">
              <div class="col-md-4 d-flex align-items-center">
                <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                </a>
                <span class="text-muted">💱 Currency Exchanger</span>
              </div>

              <ul class="nav col-md-4 justify-content-end list-unstyled d-flex mx-4">
                <li className="ms-3"><a class="text-muted" href="https://www.linkedin.com/in/david-anachuri" target="_blank"><i class="bi bi-linkedin"></i> LinkedIn</a></li>
                <li className="ms-3"><a class="text-muted" href="https://github.com/Davo182" target="_blank"><i class="bi bi-github"></i> GitHub</a></li>
              </ul>
            </footer>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
