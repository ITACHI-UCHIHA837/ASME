// // import Form from 'react-bootstrap/Form';

// // function Range({Lable}) {
// //   return (
// //     <>
// //       <Form.Label>{Lable}</Form.Label>
// //       <Form.Range />
// //     </>
// //   );
// // }

// // export default Range;

// import { useState } from 'react';
// import Form from 'react-bootstrap/Form';

// function Range({
//   label = 'Range',
//   min = 0,
//   max = 100,
//   step = 1,
//   defaultValue = 50,
//   unit = '',
//   onChange
// }) {
//   const [value, setValue] = useState(defaultValue);

//   const handleChange = (e) => {
//     const val = Number(e.target.value);
//     setValue(val);
//     onChange && onChange(val); // send to parent
//   };

//   return (
//     <Form.Group className="mb-2">

//       {/* Label + Value */}
//       <div className="d-flex justify-content-between">
//         <Form.Label style={{ fontSize: '12px' }}>{label}</Form.Label>
//         <span style={{ fontSize: '11px', fontWeight: 600 }}>
//           {value} {unit}
//         </span>
//       </div>

//       {/* Range Slider */}
//       <Form.Range
//         min={min}
//         max={max}
//         step={step}
//         value={value}
//         onChange={handleChange}
//       />

//     </Form.Group>
//   );
// }

// export default Range;

import { useState } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function Range({
  label = 'Range',
  toconvert=1,
  min = 0,
  max = 1,
  step = 0.1,
  defaultValue = 0.5,
  unit = '',
  precision = 2,
  onChange
}) {
  // const [value, setValue] = useState(defaultValue);
//const value = defaultValue;
  // const handleChange = (e) => {
  //   const val = parseFloat(e.target.value);
  //   setValue(val);
  //   onChange && onChange(val);
  // };

  return (
    <Form.Group className="mb-2">

      {/* Label + Value */}
      <div className="d-flex justify-content-between">
        <Form.Label style={{ fontSize: '12px' }}>{label}</Form.Label>
        <span style={{ fontSize: '11px', fontWeight: 600, display:'flex' ,marginBlockEnd:'1px' }}>

           <Container>
      <Row className="justify-content-md-center" style={{ fontSize: '12px', fontWeight: 600 }}>
        <Col sm='auto'style={{ fontSize: '12px', fontWeight: 600 }}>{unit}={defaultValue.toFixed(precision)}</Col>
        <Col md='auto' style={{ fontSize: '12px', fontWeight: 600 }} >{toconvert}=
                    {toconvert=='Psi'?(defaultValue*14.5037738).toFixed(3):null}
                    {toconvert=='ºF'?(defaultValue*9/5+32).toFixed(3):null}
                    {toconvert=='inch'?(defaultValue/25.4).toFixed(3):null}
        </Col>
        {/* <Col sm={2}>sm=4</Col> */}
      
      </Row>
      </Container>
          {/* <span style={{ fontSize: '11px', fontWeight: 600, display:'flex' ,marginBlockEnd:'1px' }}>
          </span>
          <span style={{ fontSize: '11px', fontWeight: 600, display:'flex' ,marginBlockEnd:'1px' }}>
         
          </span>
          <span style={{ fontSize: '11px', fontWeight: 600, display:'flex' , marginRight:'100px' }}>
         
          </span>
            
           */}
          
        </span>
      </div>

      {/* Range */}
      <Form.Range
        min={min}
        max={max}
        step={step}
        toconvert={toconvert}
        value={defaultValue}
        onChange={(e)=>onChange(parseFloat(e.target.value))}
      />

    </Form.Group>
  );
}

export default Range;