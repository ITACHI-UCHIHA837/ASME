
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Dicription from '../../sections/pipeline/dicription';
import Input_field from "../../sections/pipeline/Input_field";
import Equations from '../../sections/pipeline/Equations';
import Inpudesign from '../../sections/pipeline/Inpudesign';
import Calculation from '../../sections/pipeline/Calculation';
import Longitudinal_Stresses_RestrainedPipe from '../../sections/pipeline/Longitudinal_Stresses_RestrainedPipe';
import FormulaCard from '../../sections/pipeline/Longitudinal_Stresses_RestrainedPipe';
import "../../sections/pipeline/desi.module.scss"


//import FormulaCard from './components/FormulaCard';

// Inside your component, derive the result:



export default function PipelinePage() {

const mongocommit = async()=>{ 
  const token = sessionStorage.getItem("token");
  if (!token) {
    alert("Please login first");   // ❌ not logged in
    return;
  }
       const payload = {
        size: pipeinput.size.value,
          D_T_allo:pipeinput.dia_to_wall,
            wall_consi:pipeinput.wall_thik_consider,
            projname:pipeinput.projname || "untital"
        // class_id: pipeinput.class,
        // CA: pipeinput.CA,
        // menufecture:pipeinput.menufecture,
      };
  
      try {
          const ews = await fetch(`${import.meta.env.VITE_API_URL}/store`,{
            method:"POST",
            headers:{
              "Content-Type": "application/json",
               aut: `Bearer ${token}`,
               
             
            },
               body: JSON.stringify({payload})
          });
           if(!token) {
    alert("pleas login first");
    return;
  }
      //  console.log(result);
         const dara = await ews.json();
               console.log(dara);
                 alert("save success");
              
            } catch (error) {
        console.log("error in front "+error);
        
      }
    }



 const storedata= async(resultyy) => {

   const storeddata = {
        tmin:resultyy.t_min,
        hoop: resultyy.hoop_stress,
        CA:resultyy.C_A,
      };
              try {
                const res = await fetch("http://localhost:8080/add-user",{
                  method:"POST",
                      headers: {
                   "Content-Type": "application/json",
                  },
                  body: JSON.stringify(storeddata),
                });
               const data = await res.json();
               console.log(data);
              } catch (error) {
                console.log("Eroor in sending",error);
                
              }

 }

  // 🔥 MOVE STATE HERE
  const [pipeinput, setpipeinput] = useState({
    projname:"",
    size: { label: 'select size', value: 1 },
    grade: 1,
    class: 1,
    pressure: 1,
    CA: 1,
    menufecture:1,
    temp:1,
    ambi_temp:1,
    install_temp:1,
    desi_temp:1,
    desi_mini_temp:1,
    fil_ban_rad:1,
    els_ban_rad:1,
    dia_to_wall:1,
  wall_thik_consider:1.00
  });

  const [result, setResult] = useState(null);
  // 🔥 HANDLE INPUT CHANGE
  const handleChange = (name, value) => {
    setpipeinput((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 🔥 API CALL (AUTO)
  useEffect(() => {
    const sendData = async () => {

      const payload = {
        size: pipeinput.size.value,
        grade: pipeinput.grade,
        class_id: pipeinput.class,
        pressure: pipeinput.pressure,
        CA: pipeinput.CA,
        menufecture:pipeinput.menufecture,
        consi_wall_thik:pipeinput.wall_thik_consider
      };

      console.log("Sending:", payload);

      const res = await fetch('http://localhost:8000/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      console.log("Result:", data);
      
      setResult(data);
    };
    
   // sendData();
  }, [pipeinput]);
  
  useEffect(() => {
    console.log(pipeinput);
   // console.log(hoopsmyratioi.toFixed(1));

  });
  const hoopsmyratioi= (pipeinput.grade/pipeinput.grade)*100
  const P = parseFloat(pipeinput.pressure);      // internal pressure, MPa
const D = parseFloat(pipeinput.size.value);      // outside diameter, mm
const t = parseFloat(pipeinput.CA);     // wall thickness, mm

const hoopStress = (P * D) / (2 * t);

  return (
    <Container>
     <Container fluid className="p-1">
      <Row className="g-1">
        <Col md={3}>
          <Dicription  pipeinput={pipeinput}  onChangehandel={handleChange}/>
        </Col>
        <Col md={4}>
          {/* 🔥 PASS DATA + HANDLER */}
          <Input_field 
            pipeinput={pipeinput}
            onChange={handleChange}
            result={result}
            />
        </Col>
        <Col md={3}>
          <Equations result={result} inputvalue={ pipeinput} />
        </Col>
        <Col md={2}>
          <Calculation 
          pipeinput={pipeinput}
          result={result} 
          datacommit = {()=>{storedata(result)}}
          mongocommit = {()=>{mongocommit()}}
          commit={
            async ()=>{const data = {grade: pipeinput.grade,};
            console.log("comitresult:");
             const committ= await fetch('http://localhost:8000/commit',
             { method: "POST",
              headers: {"Content-Type": "application/json"},
               body: JSON.stringify(data)}) 
            //  const comitdata = await committ.json();
                }} />
        </Col>    
      </Row>
    </Container>


           {/* <Inpudesign onChange={handleChange} pipeinput={pipeinput} result={result}/> */}
          {/* <Longitudinal_Stresses_RestrainedPipe onChange={handleChange} pipeinput={pipeinput} result={result} /> */}
            {/* //<FormulaCard/> */}
         
              <Container fluid className="p-1">
      <Row className="g-1">
        <Col md={9}>
        {/* <FormulaCard
          title="Calculations - Longitudinal Stresses (Restrained Pipe)"
        //  formula="σ = (P × D) / (2 × t)"
          variables={[
            { symbol:'SP1',description:' Longitudinal Stress due to Internal Pressure '},
            { symbol:'ST', description:' Longitudinal Stress due to Thermal Expansion'},
            { symbol:'ST2',description:' Longitudinal Stress due to Thermal Expansion(Considering Minimum Design Temp.)'},
            { symbol:'SX', description:' Stress due to Axial Loading' },
            { symbol:'SB', description:' Nominal Bending Stress ' },
            // { symbol: 'P',  description: 'Internal pressure',  value: P,  unit: 'MPa' },
            // { symbol: 'D',  description: 'Outside diameter',   value: D,  unit: 'mm'  },
            // { symbol: 't',  description: 'Wall thickness',     value: t,  unit: 'mm'  },
            ]}
            result={{ value: hoopStress, unit: 'MPa' }}
            reference={{ label: 'ASME B31.3 §304.1.2', source: 'https://www.asme.org' }}/> */}
        </Col>
         
        
      </Row>
      </Container>
           
      
     
    </Container>
  );
}



