import React,{useState} from "react";
import ScrollMenu from 'react-horizontal-scrolling-menu';

const Checkbox = ({ categories, handleFilters }) => {
 const [selected, setSelected] = useState(localStorage.getItem('categoryID'))

    const handleToggle = (key) => {
      const selectedCategory = categories.find((category) => {
           return category._id === key
      })

        setSelected(selectedCategory._id)
        localStorage.setItem("categoryID", selectedCategory._id)

        handleFilters([selectedCategory._id]);
    };

    const showLoading = () =>
        (<div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
     
        const MenuItem = ({text, selected}) => {
            return <div
              className={`menu-item ${selected ? 'active' : ''}`} style={{border:'1px solid #008ECC'}}>{text}</div>;
          };
          const Arrow = ({direction, className}) => {
            return (
              <div
                className={className}>{direction === 'right' &&
               <i style={{fontSize:'12px'}} className='fas'>&#xf101;</i>
              }
              {
                direction ===  'left' &&
               <i style={{fontSize:'12px'}} className='fas'>&#xf100;</i>
                }</div>
            );
          };
           
           
          const ArrowLeft = Arrow({direction: "left",className:'arrow-prev'});
          const ArrowRight = Arrow({direction: "right",className:'arrow-prev'});


 const Menu = (list) =>
  list.map(el => {

    const {name, _id} = el;
 
 const selected = _id === localStorage.getItem('categoryID')

    return <MenuItem text={name} key={_id} selected={selected} />;
  });

    return(
        <div className="container mb-1" style={{backgroundColor:'#f2f2f2',borderRadius:'3px'}}>
                {!categories.length? (showLoading()):(
                    <ScrollMenu
          data={Menu(categories)}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={handleToggle}/>
                )}
        </div>
    )
};

export default Checkbox;
