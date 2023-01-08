import {
  Button,
  ButtonContainer,
  CategoryBox,
  CategoryContainer,
  CategoryImage,
  Container,
  Form,
  FormTitle,
  MapContainer,
  Section,
} from "./styles";
import Input from "../../components/Input";
import { useState } from "react";
import { LatLngExpression } from "leaflet";
import { TileLayer, Marker } from "react-leaflet";
import { categories  } from "./categories";
import useGetLocation from "../../hooks/useGetLocation";
import { toast } from "react-toastify";
//import { useHistory } from "react-router-dom";
  
export default function New () {
 // const history = useHistory();
  const [formValue, setFormValues] = useState({
    name: '',
    description: '',
    contact: '',
    category: '',
    coords: [0, 0],

  });

  const { coords } = useGetLocation();
   

  async function onSubmit () {
    const request = await fetch(`http://localhost:3000/store`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formValue,
        latitude: formValue.coords[0],
        longitude: formValue.coords[1],
      })
    });

    if (request.ok) {
      toast('Estabelecimento gravado com sucesso!', {
        type: "success", 
        autoClose: 2000,
        onClose: () => {}
      })

    }
  }
 
  if (!coords) {
    return <h1>Obtendo localização ...</h1>;
  }

  return (
    <Container>
      <Form onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit();

      }
      
      }>
        <FormTitle>
          Cadastro do comércio local
        </FormTitle>
        
        <Section>
          Dados
        </Section>    
        <Input 
        label="Nome do Local" 
        name="name" 
        value={formValue.name} 
        onChange={setFormValues}

        />

         <Input 
        label="Descrição" 
        name="description" 
        value={formValue.description} 
        onChange={setFormValues}
        
        /> 

         <Input 
        label="Contato" 
        name="contact" 
        value={formValue.contact} 
        onChange={setFormValues}

        /> 

        <Section>Endereço</Section>

        <MapContainer center={{
          lat: coords[0],
          lng: coords[1],
        } as LatLngExpression}
        zoom={13}
        > 
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={
          [formValue.coords[0], formValue.coords[1]] as LatLngExpression 
          }
          />
        </MapContainer>

        <Section>Categoria</Section>

        <CategoryContainer>
          {categories.map(category => (
            <CategoryBox 
             key={category.key}
             onClick={() =>{
              setFormValues(prev => ({...prev, category: category.key }))
             }}
             isActive={formValue.category === category.key} 
             >
            
            <CategoryImage src={category.url}/>
            {category.label}
             </CategoryBox>
          ))}
        </CategoryContainer>

        <ButtonContainer>
          <Button type="submit" >Salvar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  )
}