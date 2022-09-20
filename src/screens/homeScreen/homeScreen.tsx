import "./homeScreen.scss";
import JobsPost from "../../components/jobPost/jobPost";
import FilterDiv from "../../components/filterDiv/filterDiv";
import Header from "../../components/header/header";

const HomeScreen = () => {
  return (
    <div className="App"> 
      <Header /> 
      <div className="search-div">
        <i className="search-icon"></i>
        <input className="search-input" type="text" placeholder="Pesquise por tag ou localização"></input>
        <button className="search-submit primary-button">Buscar</button>
      </div>      
      <FilterDiv></FilterDiv>
      <main className="site-main">
        <section className="jobs-section">
          <JobsPost></JobsPost>
          <JobsPost></JobsPost>
          <JobsPost></JobsPost>
        </section>
      </main>
    </div>
  );
}

export default HomeScreen;