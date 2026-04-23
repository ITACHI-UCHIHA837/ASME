import { Form } from 'react-bootstrap';

export default function Dropdown({  options, value, onChange }) {
  return (
    <Form.Group className="mb-2">
      {/* <Form.Label style={{ fontSize: '12px' }}>{label}</Form.Label> */}

      <Form.Select
        size="sm"
        value={options.value}
        onChange={onChange}
      >
        {options.map((item) => (
      
           <option key={item.index} value={item.value}>
              {item.Psi || item.inch ?<>{item.label}-{item.inch}-{item.value}{item.Psi}</>:<>{item.label}-{item.value}</>}
              {/* {?<>{item.label}=={item.inch}----{item.value}</>:null} */}
        
            </option>
            ))}
          {/* {item.label}{item.inch}   --      {item.value}{item.Psi} */}
          {/* {<>{item.label}--{item.value}</>} */}
      </Form.Select>
    </Form.Group>
  );
}