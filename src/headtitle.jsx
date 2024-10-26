import { NavLink } from 'react-router-dom';
const Headtitle = () => {
  return (
    <>
      <NavLink to="/">
        <div className="app-name">
          <h2 className="enlace">
            Enlace <span className="--hub">Hub</span>
          </h2>
        </div>
      </NavLink>
    </>
  );
};
export default Headtitle;
