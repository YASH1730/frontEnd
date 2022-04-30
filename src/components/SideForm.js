import React, { useState, useContext, useRef, useEffect } from "react";
import {
  Button,
  IconButton,
  MenuItem,
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup
} from "@mui/material";
import { Editor } from '@tinymce/tinymce-react'
import Slide from "@mui/material/Slide";
import Backdrop from "@mui/material/Backdrop";
import "../assets/custom/css/sideForm.css";
import { useDropzone } from "react-dropzone";
import CancelIcon from "@mui/icons-material/Cancel";
import { OpenBox, Mode, Notify } from "../App";

// service 
import {
  addCategory, editCategory, addProduct, getLastProduct, updateProduct, categoryList, addSubCategories, getSubCatagories, editSubCatagories, addPrimaryMaterial, editPrimaryMaterial,
  addSecondaryMaterial, editSecondaryMaterial, getPrimaryMaterial, getSecondaryMaterial, addPolish, editPolish, getPolish
} from '../services/service.js'


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};



const Sideform = () => {
  // multple images 
  const [files, setFiles] = useState([]);
  const [featured, setFeatured] = useState([]);

  // single images
  const [Image, setImages] = useState([]);

  function FeaturesPreviews(props) {


    const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {


        setFeatured(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })))

      }
    });

    const thumbs = featured.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt="Images"
            // Revoke data uri after image is loaded
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
          />
        </div>
      </div>
    ));

    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
      <section className="container dorpContainer">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} multiple />
          <p>{props.text}</p>
        </div>
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
      </section>
    );
  }

  function ProductsPreviews(props) {


    const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {


        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })))

      }
    });

    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt="Images"
            // Revoke data uri after image is loaded
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
          />
        </div>
      </div>
    ));

    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
      <section className="container dorpContainer">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} multiple />
          <p>{props.text}</p>
        </div>
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
      </section>
    );
  }
  function ImagePreviews(props) {


    const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {


        setImages(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })))

      }
    });

    const thumbs = Image.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt="Images"
            // Revoke data uri after image is loaded
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
          />
        </div>
      </div>
    ));

    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
      <section className="container dorpContainer">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>{props.text}</p>
        </div>
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
      </section>
    );
  }


  const post = [
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Accountant",
      label: "Accountant",
    },
    {
      value: "CEO",
      label: "CEO",
    },
    {
      value: "Driver",
      label: "Driver",
    },
    {
      value: "Delivery Person",
      label: "Delivery Person",
    },
    {
      value: "Manager",
      label: "Manager",
    },
    {
      value: "Security Gaurd",
      label: "Security Gaurd",
    },
  ];



  const dispatchTimeCatalog = [
    {
      value: "3 to 5 Days",
      label: "3 to 5 Days",
    },
    {
      value: "5 to 8 Days",
      label: "5 to 8 Days",
    },
    {
      value: "1 to 2 Week",
      label: "1 to 2 Week",
    },
    {
      value: "2 to 3 Week",
      label: "2 to 3 Week",
    },
    {
      value: "3 to 4 Week",
      label: "3 to 4 Week",
    },
    {
      value: "4 to 5 Week",
      label: "4 to 5 Week",
    },
    {
      value: "5 to 6 Week",
      label: "5 to 6 Week",
    },
    {
      value: "6 to 7 Week",
      label: "6 to 7 Week",
    }
  ];


  const taxRateCatalog = [
    {
      value: "18",
      label: "18",
    },
    {
      value: "5",
      label: "5",
    },
    {
      value: "2",
      label: "2",
    }

  ];



  const hingeCatalog = [
    {
      value: "Brass",
      label: "Brass",
    },
    {
      value: "Metallic",
      label: "Metallic",
    },
    {
      value: "Silver",
      label: "Silver",
    }

  ];

  const knobCatalog = [
    {
      value: "Brass",
      label: "Brass",
    },
    {
      value: "Metallic",
      label: "Metallic",
    },
    {
      value: "Silver",
      label: "Silver",
    }

  ];

  const handleCatalog = [
    {
      value: "Brass",
      label: "Brass",
    },
    {
      value: "Metallic",
      label: "Metallic",
    },
    {
      value: "Silver",
      label: "Silver",
    }

  ];

  const legCatalog = [
    {
      value: "Folding Legs",
      label: "Folding Legs",
    },
    {
      value: "Knockdown Legs",
      label: "Knockdown Legs",
    }

  ];
  const doorCatalog = [
    {
      value: "Brass",
      label: "Brass",
    },
    {
      value: "Metallic",
      label: "Metallic",
    },
    {
      value: "Silver",
      label: "Silver",
    }

  ];

  const weightCapCatalog = [
    {
      value: "Child",
      label: "Child",
    },
    {
      value: "Light Weight",
      label: "Light Weight",
    },
    {
      value: "Adult",
      label: "Adult",
    }

  ];

  const trollyMaterial = [
    {
      value: "Teak Wood",
      label: "Teak Wood",
    },
    {
      value: "Natural Solid Wood",
      label: "Natural Solid Wood",
    }
    ,
    {
      value: "Stone",
      label: "Stone",
    }
    ,
    {
      value: "Metal",
      label: "Metal",
    }
    ,
    {
      value: "Brass",
      label: "Brass",
    }
    ,
    {
      value: "Copper",
      label: "Copper",
    }
    ,
    {
      value: "Glass",
      label: "Glass",
    }
    ,
    {
      value: "Mango Wood",
      label: "Mango Wood",
    }
    ,
    {
      value: "Pine wood",
      label: "Pine wood",
    }
    ,
    {
      value: "Acacia wood",
      label: "Acacia wood",
    }
    ,
    {
      value: "Sheesham wood",
      label: "Sheesham wood",
    }
    ,
    {
      value: "Ceramic",
      label: "Ceramic",
    }
    ,
    {
      value: "Brass Coated SS",
      label: "Brass Coated SS",
    }
    ,
    {
      value: "Iron Jali",
      label: "Iron Jali",
    }
    ,
    {
      value: "Glass Jali",
      label: "Glass Jali",
    }

  ];



  const fittingCatalog = [
    {
      value: "Brass",
      label: "Brass",
    },
    {
      value: "Metallic",
      label: "Metallic",
    },
    {
      value: "Silver",
      label: "Silver",
    }

  ];



  // context
  const SideBox = useContext(OpenBox);
  const viewMode = useContext(Mode);
  const dispatchAlert = useContext(Notify);



  useEffect(() => {

    categoryList().then((data) => {
      if (data.data === null) return setCategory([])

      return setCategory(data.data)
    })

    getSubCatagories().then((data) => {
      if (data.data === null) return setSubCategory([])

      return setSubCategory(data.data)
    })

    getPrimaryMaterial().then((data) => {
      if (data.data === null) return setMaterialCatalog([])

      return setMaterialCatalog(data.data)
    })

    getSecondaryMaterial().then((data) => {
      if (data.data === null) return setSecMaterialCatalog([])

      return setSecMaterialCatalog(data.data)
    })

    getPolish().then((data) => {
      if (data.data === null) return setPolishCatalog([])

      return setPolishCatalog(data.data)
    })

  }, [SideBox.open.formType])




  // states
  const [cat, setCat] = useState();
  const [subCat, setSubCat] = useState();
  const [dispatchTime, setDispatch] = useState();
  const [taxRate, setTaxRate] = useState();
  const [fitting, setFitting] = useState();
  const [Polish, setPolish] = useState();
  const [Hinge, setHinge] = useState();
  const [Knob, setKnob] = useState();
  const [handle, setHandle] = useState();
  const [door, setDoor] = useState();
  const [weightCap, setWeightCap] = useState();
  const [material, setMaterial] = useState();
  const [secMaterial, setSecMaterial] = useState(undefined);
  const [mirrorVal, setMirrorVal] = useState('no');
  const [assemblyVal, setAssemblyVal] = useState();
  const [leg, setLeg] = useState();
  const [silver, setSilver] = useState();
  const [trollyVal, setTrollyVal] = useState();
  const [trolly, settrolly] = useState();


  // states for the dynamic rendering 
  const [SKU, setSKU] = useState('');
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [materialCatalog, setMaterialCatalog] = useState([]);
  const [secMaterialCatalog, setSecMaterialCatalog] = useState([]);
  const [polishCatalog, setPolishCatalog] = useState([]);


  // ref
  const editorRef = useRef();
  const sellingPoints = useRef();

  const handleChange = (event) => {
    setCat(event.target.value);
  };
  const handleChangeSubCat = (event) => {
    setSubCat(event.target.value);
  };
  const handleChangeTrollyVal = (event) => {
    setTrollyVal(event.target.value);
  };
  const handleChangeTrolly = (event) => {
    settrolly(event.target.value);
  };

  const handleChangeDispatchTime = (event) => {
    setDispatch(event.target.value);
  };

  const handleChangeTaxRate = (event) => {
    setTaxRate(event.target.value);
  };

  const handleChangeFitting = (event) => {
    setFitting(event.target.value);
  };

  const handleChangePolish = (event) => {
    setPolish(event.target.value);
  };

  const handleChangeHinge = (event) => {
    setHinge(event.target.value);
  };

  const handleChangeKnob = (event) => {
    setKnob(event.target.value);
  };

  const handleChangeHandle = (event) => {
    setHandle(event.target.value);
  };

  const handleChangeDoor = (event) => {
    setDoor(event.target.value);
  };

  const handleChangeWeightCap = (event) => {
    setWeightCap(event.target.value);
  };

  const handleChangeMaterial = (event) => {
    setMaterial(event.target.value);
  };

  const handleChangeSecMaterial = (event) => {
    setSecMaterial(event.target.value);
  };
  const handleChangeMirror = (event) => {
    // console.log(event.target.value);
    setMirrorVal(event.target.value);
  };

  const hanleChangeAssembly = (event) => {
    // console.log(event.target.value);
    setAssemblyVal(event.target.value);
  };


  const handleChangeLeg = (event) => {
    // console.log(event.target.value);
    setLeg(event.target.value);
  };



  const handelClose = () => {
    SideBox.setOpen({ state: false, formType: null });
    resetAll();
  };

  const handleChangeSilver = (e) => {
    setSilver(e.target.value)
  }

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
  } = useDropzone({
    maxFiles: 10,
    accept: "image/jpeg,image/png",
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  // function for genrating product SKU ID

  const getSKU = () => {

    getLastProduct()
      .then((res) => {
        if (res.data.length > 0) {
          // console.log(res.data[0].SKU)

          let index = parseInt(res.data[0].SKU.split('-')[1]) + 1;

          setSKU(`WS-0${index}`);
        }
        else {
          setSKU('WS-01001')
        }
      })
      .catch((err) => {
        console.log(err)
      })

  }



  // function for handling category
  const handelCategory = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append('category_image', Image[0]);
    FD.append('category_name', e.target.category_name.value)
    FD.append('category_status', e.target.category_status.checked)


    // console.log(acceptedFiles[0].name, e.target.category_name.value)



    const res = addCategory(FD)

    res.then((data) => {
      console.log(data)
      dispatchAlert.setNote({
        open: true,
        variant: 'success',
        message: data.data.message

      })
    })
      .catch((err) => {
        console.log(err)
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: "May be duplicate Category found !!!"

        })
      })



  }

  // function for handling update category
  const handelUpdateCategory = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append('_id', SideBox.open.payload)
    FD.append('category_image', Image[0]);
    e.target.category_name.value !== undefined ? FD.append('category_name', e.target.category_name.value) : console.log();



    const res = editCategory(FD)

    res.then((data) => {
      console.log(data)
      dispatchAlert.setNote({
        open: true,
        variant: 'success',
        message: data.data.message

      })
    })
      .catch((err) => {
        console.log(err)
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: "May be duplicate Category found !!!"

        })
      })
  }

  // function fo reseting the values

  const resetAll = () => {
    document.getElementById('myForm').reset();
  }

  // function for handling Update Products category
  const handelUpdateProduct = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append('_id', SideBox.open.payload._id)

    acceptedFiles.length !== 0 ? FD.append('product_image', acceptedFiles[0], acceptedFiles[0].name) : console.log();


    FD.append('category_name', e.target.category_name.value);
    FD.append('sub_category_name', e.target.sub_category_name.value);
    FD.append('dispatch_time', e.target.dispatch_time.value);
    FD.append('product_description', editorRef.current.getContent());
    FD.append('selling_points', sellingPoints.current.getContent());
    FD.append('SKU', e.target.SKU.value);

    e.target.seo_description.value !== '' ? FD.append('seo_description', e.target.seo_description.value) : console.log();
    e.target.product_title.value !== '' ? FD.append('product_title', e.target.product_title.value) : console.log();
    e.target.MRP.value !== '' ? FD.append('MRP', e.target.MRP.value) : console.log();
    e.target.seo_title.value !== '' ? FD.append('seo_title', e.target.seo_title.value) : console.log();
    e.target.discount_limit.value !== '' ? FD.append('discount_limit', e.target.discount_limit.value) : console.log();
    e.target.selling_price.value !== '' ? FD.append('selling_price', e.target.selling_price.value) : console.log();

    FD.append('secondary_marterial', e.target.secondary_marterial.value);
    FD.append('primary_material', e.target.primary_material.value);

    if (secMaterial !== undefined)
      e.target.secondary_marterial_weight.value ? FD.append('secondary_marterial_weight', e.target.secondary_marterial_weight.value) : console.log();

    FD.append('hinge', e.target.hinge.value);
    FD.append('knob', e.target.knob.value);
    FD.append('handle', e.target.handle.value);
    FD.append('door', e.target.door.value);
    FD.append('fitting', e.target.fitting.value);
    FD.append('weight_capacity', e.target.weight_capacity.value);
    FD.append('polish', e.target.polish.value);

    //  console.log(e.target.length_main.value

    e.target.length_main.value !== '' ? FD.append('length_main', e.target.length_main.value) : console.log();
    e.target.breadth.value !== '' ? FD.append('breadth', e.target.breadth.value) : console.log();
    e.target.height.value !== '' ? FD.append('height', e.target.height.value) : console.log();
    e.target.weight.value !== '' ? FD.append('weight', e.target.weight.value) : console.log();
    e.target.top_size.value !== '' ? FD.append('top_size', e.target.top_size.value) : console.log();
    e.target.dial_size.value !== '' ? FD.append('dial_size', e.target.dial_size.value) : console.log();
    e.target.seating_size_width.value !== '' ? FD.append('seating_size_width', e.target.seating_size_width.value) : console.log();
    e.target.seating_size_depth.value !== '' ? FD.append('seating_size_depth', e.target.seating_size_depth.value) : console.log();
    e.target.seating_size_height.value !== '' ? FD.append('seating_size_height', e.target.seating_size_height.value) : console.log();


    // Radio button

    (e.target.wall_hanging.value !== '') ? FD.append('wall_hanging', e.target.wall_hanging.value) : console.log();
    (e.target.assembly_required.value !== '') ? FD.append('assembly_required', e.target.assembly_required.value) : console.log();

    if (assemblyVal === 'shipping')
      e.target.assembly_part.value !== '' ? FD.append('assembly_part', e.target.assembly_part.value) : console.log();

    (e.target.wheel.value !== '') ? FD.append('mirror', e.target.mirror.value) : console.log();

    if (e.target.mirror.value === 'yes') {
      e.target.mirror_length.value !== '' ? FD.append('mirror_length', e.target.mirror_length.value) : console.log();
      e.target.mirror_width.value !== '' ? FD.append('mirror_width', e.target.mirror_width.value) : console.log();

    }

    (e.target.wheel.value !== '') ? FD.append('wheel', e.target.wheel.value) : console.log();
    (e.target.silver.value !== '') ? FD.append('silver', e.target.silver.value) : console.log();


    // could be empty 

    (e.target.joints.value !== '') ? FD.append('joints', e.target.joints.value) : console.log();
    (e.target.trolley.value !== '') ? FD.append('trolley', e.target.trolley.value) : console.log();




    // checkbox

    FD.append('rotating_seats', e.target.rotating_seats.checked || SideBox.open.payload.rotating_seats);
    FD.append('eatable_oil_polish', e.target.eatable_oil_polish.checked || SideBox.open.payload.eatable_oil_polish);
    FD.append('no_chemical', e.target.no_chemical.checked || SideBox.open.payload.no_chemical);
    FD.append('lean_back', e.target.lean_back.checked || SideBox.open.payload.lean_back);
    FD.append('weaving', e.target.weaving.checked || SideBox.open.payload.weaving);
    FD.append('not_suitable_for_Micro_Dish', e.target.not_suitable_for_Micro_Dish.checked || SideBox.open.payload.not_suitable_for_Micro_Dish);
    FD.append('tilt_top', e.target.tilt_top.checked || SideBox.open.payload.tilt_top);
    FD.append('indise_compartments', e.target.indise_compartments.checked || SideBox.open.payload.indise_compartments);
    FD.append('stackable', e.target.stackable.checked || SideBox.open.payload.stackable);


    e.target.tax_rate.value !== undefined ? FD.append('tax_rate', e.target.tax_rate.value) : console.log();



    for (var value of FD.values()) {
      console.log(value);
    }


    for (var key of FD.keys()) {
      console.log(key);
    }

    const res = updateProduct(FD)

    res.then((data) => {
      console.log(data)

      if (data.status !== 203) {
        dispatchAlert.setNote({
          open: true,
          variant: 'success',
          message: data.data.message

        })
      }
      else {

        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: data.data.message

        })
      }

    })
      .catch((err) => {
        console.log(err)
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: "May be duplicate Category found !!!"

        })
      })
  }


  const handelProduct = (e) => {
    e.preventDefault();

    const FD = new FormData();

    console.log(files)

    files.map((element) => {
      return FD.append('product_image', element);

    })

    featured.map((element) => {
      return FD.append('featured_image', element);

    })





    FD.append('category_name', e.target.category_name.value);
    FD.append('sub_category_name', e.target.sub_category_name.value);
    FD.append('dispatch_time', e.target.dispatch_time.value);
    FD.append('product_title', e.target.product_title.value);
    FD.append('product_description', editorRef.current.getContent());
    FD.append('selling_points', sellingPoints.current.getContent());
    FD.append('SKU', e.target.SKU.value);
    FD.append('MRP', e.target.MRP.value);
    FD.append('seo_title', e.target.seo_title.value);
    FD.append('seo_description', e.target.seo_description.value);
    FD.append('discount_limit', e.target.discount_limit.value);
    FD.append('selling_price', e.target.selling_price.value);
    FD.append('primary_material', e.target.primary_material.value);
    FD.append('secondary_marterial', e.target.secondary_marterial.value);
    FD.append('legs', e.target.legs.value);

    if (secMaterial !== undefined)
      FD.append('secondary_marterial_weight', e.target.secondary_marterial_weight.value);
    FD.append('length_main', e.target.length_main.value);
    FD.append('breadth', e.target.breadth.value);
    FD.append('height', e.target.height.value);
    FD.append('weight', e.target.weight.value);
    FD.append('polish', e.target.polish.value);
    FD.append('hinge', e.target.hinge.value);
    FD.append('knob', e.target.knob.value);
    FD.append('handle', e.target.handle.value);
    FD.append('door', e.target.door.value);
    FD.append('fitting', e.target.fitting.value);
    FD.append('top_size', e.target.top_size.value);
    FD.append('dial_size', e.target.dial_size.value);
    FD.append('seating_size_width', e.target.seating_size_width.value);
    FD.append('seating_size_depth', e.target.seating_size_depth.value);
    FD.append('seating_size_height', e.target.seating_size_height.value);
    FD.append('weight_capacity', e.target.weight_capacity.value);
    FD.append('wall_hanging', e.target.wall_hanging.value);
    FD.append('assembly_required', e.target.assembly_required.value);

    if (assemblyVal === 'shipping')
      FD.append('assembly_part', e.target.assembly_part.value);
    if (assemblyVal === 'yes')
      FD.append('legs', e.target.legs.value);

    if (silver === 'yes')
      FD.append('silver_weight', e.target.silver_weight.value);


    if (trolly === 'yes')
      FD.append('trolly_matterial', e.target.trollyMat.value);




    FD.append('mirror', e.target.mirror.value);

    if (e.target.mirror.value === 'yes') {
      FD.append('mirror_length', e.target.mirror_length.value)
      FD.append('mirror_width', e.target.mirror_width.value)
    }
    FD.append('joints', e.target.joints.value);
    FD.append('wheel', e.target.wheel.value);
    FD.append('trolley', e.target.trolley.value);
    FD.append('silver', e.target.silver.value);
    FD.append('rotating_seats', e.target.rotating_seats.checked);
    FD.append('eatable_oil_polish', e.target.eatable_oil_polish.checked);
    FD.append('no_chemical', e.target.no_chemical.checked);
    FD.append('lean_back', e.target.lean_back.checked);
    FD.append('weaving', e.target.weaving.checked);
    FD.append('not_suitable_for_Micro_Dish', e.target.not_suitable_for_Micro_Dish.checked);
    FD.append('tilt_top', e.target.tilt_top.checked);
    FD.append('indise_compartments', e.target.indise_compartments.checked);
    FD.append('stackable', e.target.stackable.checked);
    FD.append('tax_rate', e.target.tax_rate.value);

    // FD.get('product_image')


    for (var value of FD.values()) {
      console.log(">>>>", value);
    }



    const res = addProduct(FD)

    res.then((data) => {
      console.log(data)

      if (data.status !== 203) {
        dispatchAlert.setNote({
          open: true,
          variant: 'success',
          message: data.data.message

        })
      }
      else {

        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: data.data.message

        })
      }

    })
      .catch((err) => {
        console.log(err)
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: "May be duplicate Category found !!!"

        })
      })
  }

  const handelSecondaryMaterial = (e) => {

    e.preventDefault();

    const FD = new FormData();

    FD.append('secondaryMaterial_name', e.target.secondaryMaterial_name.value)
    FD.append('secondaryMaterial_status', e.target.secondaryMaterial_status.checked)


    // console.log(acceptedFiles[0].name, e.target.category_name.value)



    const res = addSecondaryMaterial(FD)

    res.then((data) => {
      console.log(data)
      dispatchAlert.setNote({
        open: true,
        variant: 'success',
        message: data.data.message

      })
    })
      .catch((err) => {
        console.log(err)
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: "May be duplicate Category found !!!"

        })
      })


  }
  const handelPrimaryMaterial = (e) => {

    e.preventDefault();

    const FD = new FormData();

    FD.append('primaryMaterial_name', e.target.primaryMaterial_name.value)
    FD.append('primaryMaterial_status', e.target.primaryMaterial_status.checked)


    // console.log(acceptedFiles[0].name, e.target.category_name.value)



    const res = addPrimaryMaterial(FD)

    res.then((data) => {
      console.log(data)
      dispatchAlert.setNote({
        open: true,
        variant: 'success',
        message: data.data.message

      })
    })
      .catch((err) => {
        console.log(err)
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: "May be duplicate Category found !!!"

        })
      })


  }

  const handelUpdatePrimaryMaterial = (e) => {

    e.preventDefault();


    const FD = new FormData();

    FD.append('_id', SideBox.open.payload)


    e.target.primaryMaterial_name.value !== '' && FD.append('primaryMaterial_name', e.target.primaryMaterial_name.value)





    const res = editPrimaryMaterial(FD)

    res.then((data) => {
      console.log(data)
      dispatchAlert.setNote({
        open: true,
        variant: 'success',
        message: data.data.message

      })
    })
      .catch((err) => {
        console.log(err)
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: "May be duplicate Category found !!!"

        })
      })


  }
  const handelUpdateSecondaryMaterial = (e) => {

    e.preventDefault();


    const FD = new FormData();

    FD.append('_id', SideBox.open.payload)


    e.target.secondaryMaterial_name.value !== '' && FD.append('secondaryMaterial_name', e.target.secondaryMaterial_name.value)





    const res = editSecondaryMaterial(FD)

    res.then((data) => {
      console.log(data)
      dispatchAlert.setNote({
        open: true,
        variant: 'success',
        message: data.data.message

      })
    })
      .catch((err) => {
        console.log(err)
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: "May be duplicate Category found !!!"

        })
      })


  }


  const handelPolish = (e) => {

    e.preventDefault();

    const FD = new FormData();

    FD.append('polish_name', e.target.polish_name.value)
    FD.append('polish_status', e.target.polish_status.checked)

    const res = addPolish(FD)

    res.then((data) => {
      console.log(data)
      dispatchAlert.setNote({
        open: true,
        variant: 'success',
        message: data.data.message

      })
    })
      .catch((err) => {
        console.log(err)
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: "May be duplicate Category found !!!"

        })
      })


  }
  const handelUpdatePolish = (e) => {

    e.preventDefault();

    const FD = new FormData();
    FD.append('_id', SideBox.open.payload)


    e.target.polish_name.value !== '' && FD.append('polish_name', e.target.polish_name.value)

    const res = editPolish(FD)

    res.then((data) => {
      console.log(data)
      dispatchAlert.setNote({
        open: true,
        variant: 'success',
        message: data.data.message

      })
    })
      .catch((err) => {
        console.log(err)
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: "May be duplicate Category found !!!"

        })
      })


  }


  const handelSubCategories = (e) => {

    e.preventDefault();

    const FD = new FormData();

    FD.append('category_id', e.target.category_id.value)
    FD.append('sub_category_name', e.target.sub_category_name.value)
    FD.append('sub_category_status', e.target.sub_category_status.checked)


    // console.log(acceptedFiles[0].name, e.target.category_name.value)



    const res = addSubCategories(FD)

    res.then((data) => {
      console.log(data)
      dispatchAlert.setNote({
        open: true,
        variant: 'success',
        message: data.data.message

      })
    })
      .catch((err) => {
        console.log(err)
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: "May be duplicate Category found !!!"

        })
      })


  }
  const handelUpdateSubCategories = (e) => {

    e.preventDefault();


    const FD = new FormData();

    FD.append('_id', SideBox.open.payload)


    e.target.category_id.value !== '' && FD.append('category_id', e.target.category_id.value)
    e.target.sub_category_name.value !== '' && FD.append('sub_category_name', e.target.sub_category_name.value)




    // console.log(acceptedFiles[0].name, e.target.category_name.value)



    const res = editSubCatagories(FD)

    res.then((data) => {
      console.log(data)
      dispatchAlert.setNote({
        open: true,
        variant: 'success',
        message: data.data.message

      })
    })
      .catch((err) => {
        console.log(err)
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: "May be duplicate Category found !!!"

        })
      })



  }


  return (
    <>
      <Slide
        direction="left"
        in={SideBox.open.state}
        mountOnEnter
        unmountOnExit
      >
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={SideBox.open.state}
        //   onClick={handelClose}
        >
          <Box className={viewMode.mode === true ? "mainDarkContainer" : "mainContainer"}>
            <IconButton
              onClick={handelClose}
              color="primary"
              className="crossButton"
            >
              <CancelIcon />
            </IconButton>

            {/* add Products */}

            {SideBox.open.formType === "product" && (

              <Grid container p={5}>
                {getSKU()}


                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Product
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your product product and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>


                  <form className="form" id='myForm' onSubmit={handelProduct} enctype='multipart/form-data' method="post">

                    {/* <AcceptMaxFiles className="dorpContainer"/> */}

                    <FormLabel id="demo-radio-buttons-group-label">Product Images</FormLabel>
                    <ProductsPreviews text={'Plese Drag and Drop the product images'}></ProductsPreviews>

                    <FormLabel id="demo-radio-buttons-group-label">Featured Images</FormLabel>

                    <FeaturesPreviews text={'Please Drag and Drop featured images'} ></FeaturesPreviews>



                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      required
                      label="SKU"
                      type="text"
                      value={SKU}
                      disabled
                      variant="outlined"
                      name='SKU'
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      required
                      label="Product Title"
                      type="text"
                      variant="outlined"
                      name="product_title"
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      required
                      autoComplete={false}
                      id="fullWidth"
                      label="SEO Title"
                      type="text"
                      variant="outlined"
                      name='seo_title'
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      required
                      autoComplete={false}
                      id="fullWidth"
                      label="SEO Description"
                      type="text"
                      variant="outlined"
                      name='seo_description'
                    />
                    <br></br>
                    <TextField
                      fullWidth
                      required
                      autoComplete={false}
                      id="fullWidth"
                      label="SEO Keyword"
                      type="text"
                      variant="outlined"
                      name='seo_keyword'
                    />



                    <br></br>
                    <FormLabel id="demo-radio-buttons-group-label">Product Description</FormLabel>

                    {/* product description  */}
                    <Editor
                      apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                      initialValue="<p>Product Disceription !!!</p>"
                      onInit={(event, editor) => editorRef.current = editor}
                      init={{
                        height: 300,
                        menubar: false,
                      }}

                    />

                    <br></br>

                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      select
                      name='category_name'
                      label="Category"
                      value={cat}
                      multiple
                      onChange={handleChange}
                      helperText="Please select your category"
                    >
                      {category.map((option) => (
                        option.category_status &&
                        <MenuItem key={option._id} value={option._id}>
                          {option.category_name}
                        </MenuItem>

                      ))}
                    </TextField>
                    <br></br>

                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      select
                      name='sub_category_name'
                      label="Sub Category"
                      value={subCat}
                      multiple
                      onChange={handleChangeSubCat}
                      helperText="Please select your sub category"
                    >
                      {subCategory.map((option) => (
                        cat === option.category_id &&
                        <MenuItem key={option.value} value={option._id}>
                          {option.sub_category_name}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Length"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name="length_main"
                      helperText="From left to right"
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Breadth"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name="breadth"
                      helperText="From front to back"

                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Height"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name="height"
                      helperText="From bottom to top"
                    />



                    <br></br>

                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      select
                      name='primary_material'
                      label="Primary Material"
                      value={material}
                      multiple
                      onChange={handleChangeMaterial}
                      helperText="Please select your Material ."

                    >
                      {materialCatalog.map((option) => (

                        option.primaryMaterial_status &&
                        <MenuItem key={option._id} value={option._id}>
                          {option.primaryMaterial_name}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Weight"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                      }}
                      variant="outlined"
                      name="weight"
                    />


                    <br></br>

                    <TextField
                      fullWidth
                      id="outlined-select"
                      select
                      name='secondary_marterial'
                      label="Secondary Material"
                      value={secMaterial}
                      multiple
                      onChange={handleChangeSecMaterial}
                      helperText="Please select your Material ."

                    >
                      {secMaterialCatalog.map((option) => (
                        option.secondaryMaterial_status &&
                        <MenuItem key={option.value} value={option._id}>
                          {option.secondaryMaterial_name}
                        </MenuItem>
                      ))}
                    </TextField>

                    {secMaterial !== undefined &&

                      <>
                        <br></br>
                        <TextField
                          fullWidth
                          autoComplete={false}
                          id="fullWidth"
                          required
                          label="Secondary Material Weight"
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                          }}
                          variant="outlined"
                          name="secondary_marterial_weight"
                        />
                      </>
                    }

                    <br></br>
                    <TextField
                      fullWidth
                      required
                      autoComplete={false}
                      id="fullWidth"
                      label="Selling Price"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                      }}
                      variant="outlined"
                      name="selling_price"
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      required
                      label="MRP"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                      }}
                      variant="outlined"
                      name="MRP"
                    />



                    <br></br>
                    <TextField
                      fullWidth
                      required
                      autoComplete={false}
                      id="fullWidth"
                      label="Discount Limit"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }}
                      variant="outlined"
                      name='discount_limit'
                    />


                    <br></br>

                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      select
                      name='dispatch_time'
                      label="Dispatch Time"
                      value={dispatchTime}
                      multiple
                      onChange={handleChangeDispatchTime}
                      helperText="Please select your dispatch time"
                    >
                      {dispatchTimeCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>


                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='polish'
                      label="Polish"
                      value={Polish}
                      multiple
                      onChange={handleChangePolish}
                      helperText="Please select your Polish."

                    >
                      {polishCatalog.map((option) => (
                        option.polish_status &&
                        <MenuItem key={option.value} value={option._id}>
                          {option.polish_name}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='hinge'
                      label="Hinge"
                      value={Hinge}
                      multiple
                      onChange={handleChangeHinge}
                      helperText="Please select your hinge."

                    >
                      {hingeCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='knob'
                      label="Knob"
                      value={Knob}
                      multiple
                      onChange={handleChangeKnob}
                      helperText="Please select your fitting."

                    >
                      {knobCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='door'
                      label="Door"
                      value={door}
                      multiple
                      onChange={handleChangeDoor}
                      helperText="Please select your fitting."

                    >
                      {doorCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='handle'
                      label="Handle"
                      value={handle}
                      multiple
                      onChange={handleChangeHandle}
                      helperText="Please select your fitting."

                    >
                      {handleCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='weight_capacity'
                      label="Weight Capacity"
                      value={weightCap}
                      multiple
                      onChange={handleChangeWeightCap}
                      helperText="Please select your fitting."

                    >
                      {weightCapCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Wall Hanging</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="no"
                        name="wall_hanging"
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>

                    <br></br>

                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Assembly Required</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="no"
                        name="assembly_required"
                        onChange={hanleChangeAssembly}
                      >
                        <FormControlLabel value="shipping" control={<Radio />} label="Shipping In Part" />
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>


                    {assemblyVal === 'shipping' && <>

                      <br></br>
                      <TextField
                        fullWidth
                        autoComplete={false}
                        id="fullWidth"
                        label="Assemble Part"
                        type="number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">No. of parts</InputAdornment>,
                        }}
                        variant="outlined"
                        name="assembly_part"
                      />


                    </>}
                    {assemblyVal === 'yes' && <>

                      <br></br>
                      <TextField
                        fullWidth

                        id="outlined-select"
                        select
                        name='legs'
                        label="Table Legs"
                        value={leg}
                        multiple
                        onChange={handleChangeLeg}
                        helperText="Please select your leg "

                      >
                        {legCatalog.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>


                    </>}


                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='fitting'
                      label="Fitting"
                      value={fitting}
                      multiple
                      onChange={handleChangeFitting}
                      helperText="Please select your fitting."

                    >
                      {fittingCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>

                    {/* {Features} */}

                    <FormGroup>
                      <FormLabel id="demo-radio-buttons-group-label">Features</FormLabel>
                      <FormControlLabel control={<Checkbox name='rotating_seats' />} label="Rotating Seats" />
                      <FormControlLabel control={<Checkbox name='eatable_oil_polish' />} label="Eatable Oil Polished" />
                      <FormControlLabel control={<Checkbox name='no_chemical' />} label="No Chemical Used" />
                      <FormControlLabel control={<Checkbox name='lean_back' />} label="Lean Back" />
                      <FormControlLabel control={<Checkbox name='weaving' />} label="Weaving" />
                      <FormControlLabel control={<Checkbox name='not_suitable_for_Micro_Dish' />} label="Not Suitable For Microwave/Dishwasher" />
                      <FormControlLabel control={<Checkbox name='tilt_top' />} label="Tilt Top" />
                      <FormControlLabel control={<Checkbox name='indise_compartments' />} label="Inside Compartments" />
                      <FormControlLabel control={<Checkbox name='stackable' />} label="Stackable" />
                    </FormGroup>

                    <br></br>

                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Silver</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        onChange={handleChangeSilver}
                        name="silver"
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>

                    {
                      silver === 'yes' &&
                      <TextField
                        fullWidth
                        autoComplete={false}
                        id="fullWidth"
                        label="Sliver Weight"
                        type="text"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">Gram</InputAdornment>,
                        }}
                        variant="outlined"
                        name="silver_weight"
                      />

                    }



                    <br></br>
                    {/* selling points  */}
                    <FormLabel id="demo-radio-buttons-group-label">Selling Points </FormLabel>

                    <Editor
                      apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                      initialValue="<p>Selling Points !!!</p>"
                      onInit={(event, editor) => sellingPoints.current = editor}
                      init={{
                        height: 300,
                        max_chars: 1000,
                        menubar: false,
                      }}

                    />

                    <br></br>

                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Mirror</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="no"
                        name="mirror"
                        onChange={handleChangeMirror}

                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>

                    {mirrorVal !== 'no' && <>

                      <br></br>
                      <TextField
                        fullWidth
                        autoComplete={false}
                        id="fullWidth"
                        label="Mirror Lenth"
                        type="text"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                        }}
                        variant="outlined"
                        name="mirror_length"
                      />

                      <br></br>
                      <TextField
                        fullWidth
                        autoComplete={false}
                        id="fullWidth"
                        label="Mirror Width"
                        type="text"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                        }}
                        variant="outlined"
                        name="mirror_width"
                      />



                    </>}

                    <br></br>

                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Joints</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"

                        name="joints"
                      >
                        <FormControlLabel value="single" control={<Radio />} label="Single" />
                        <FormControlLabel value="multi" control={<Radio />} label="Multiple" />
                      </RadioGroup>
                    </FormControl>

                    <br></br>

                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      select
                      name='tax_rate'
                      label="Tax Rate"
                      value={taxRate}
                      multiple
                      onChange={handleChangeTaxRate}
                      helperText="Please select your tax rate."
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }}
                    >
                      {taxRateCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Seating Size Width"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name="seating_size_width"
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Seating Size Width Depth"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name="seating_size_depth"

                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Seating Size Height"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name="seating_size_height"
                    />

                    <br></br>

                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Wheel</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"

                        name="wheel"
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>



                    <br></br>

                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Trolley</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        onChange={handleChangeTrolly}
                        name="trolley"
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>

                    {trolly === 'yes' && <>

                      <br></br>
                      <TextField
                        fullWidth

                        id="outlined-select"
                        select
                        name='trollyMat'
                        label="Trolly Material"
                        value={trollyVal}
                        multiple
                        onChange={handleChangeTrollyVal}
                        helperText="Please select your Trolly Matterial "


                      >
                        {trollyMaterial.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>


                    </>}


                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Top Size"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name="top_size"
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Dial Size"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name="dial_size"
                    />

                    <br></br>

                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Add Product
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}


            {/* add Products Ends */}


            {/* Update Products */}

            {SideBox.open.formType === "update_product" && (

              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Product
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update your product product and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" id='myForm' onSubmit={handelUpdateProduct} enctype='multipart/form-data' method="post">
                    <section className="dorpContainer">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input type='file' {...getInputProps()} name='product_image' />
                        <p>
                          Drag & drop some product images here, or click to
                          select image
                        </p>
                        <em>(Only *.jpeg and *.png images will be accepted)</em>
                      </div>
                      <aside>
                        <h5>File Name</h5>
                        <ul>{acceptedFileItems}</ul>
                      </aside>
                    </section>


                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      required
                      label="SKU"
                      type="text"
                      value={SideBox.open.payload.SKU}
                      disabled
                      variant="outlined"
                      name='SKU'
                    />
                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='category_name'
                      label="Category"
                      value={cat || SideBox.open.payload.category_name}
                      multiple
                      onChange={handleChange}
                      helperText="Please select your category"
                    >
                      {category.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='sub_category_name'
                      label="Sub Category"
                      value={subCat || SideBox.open.payload.sub_category_name}
                      multiple
                      onChange={handleChangeSubCat}
                      helperText="Please select your sub category"
                    >
                      {subCategory.map((option) => (
                        cat === option.category_id &&
                        <MenuItem key={option.value} value={option._id}>
                          {option.sub_category_name}
                        </MenuItem>
                      ))}
                    </TextField>


                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"

                      label="Product Title"
                      type="text"
                      variant="outlined"
                      name="product_title"
                    />

                    <br></br>
                    <TextField
                      fullWidth

                      autoComplete={false}
                      id="fullWidth"
                      label="SEO Title"
                      type="text"
                      variant="outlined"

                      name='seo_title'
                    />

                    <br></br>
                    <TextField
                      fullWidth

                      autoComplete={false}
                      id="fullWidth"
                      label="SEO Description"
                      type="text"
                      variant="outlined"
                      name='seo_description'
                    />



                    <br></br>
                    {/* product description  */}
                    <Editor
                      apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"

                      initialValue={SideBox.open.payload.product_description}
                      onInit={(event, editor) => editorRef.current = editor}
                      init={{
                        height: 300,
                        menubar: false,
                      }}

                    />

                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='primary_material'
                      label="Primary Material"
                      value={material || SideBox.open.payload.primary_material}
                      multiple
                      onChange={handleChangeMaterial}
                      helperText="Please select your Material ."

                    >
                      {materialCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='secondary_marterial'
                      label="Secondary Material"
                      value={secMaterial || SideBox.open.payload.secondary_marterial}
                      multiple
                      onChange={handleChangeSecMaterial}
                      helperText="Please select your Material ."

                    >
                      {secMaterialCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    {secMaterial !== undefined &&
                      <>
                        <br></br>
                        <TextField
                          fullWidth
                          autoComplete={false}
                          id="fullWidth"

                          label="Secondary Material Weight"
                          type="number"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                          }}
                          variant="outlined"
                          name="secondary_marterial_weight"
                        />
                      </>
                    }

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Length"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name="length_main"
                      helperText="From left to right"
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Breadth"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name="breadth"
                      helperText="From front to back"

                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Height"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name="height"
                      helperText="From bottom to top"
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Weight"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                      }}
                      variant="outlined"
                      name="weight"
                    />


                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='polish'
                      label="Polish"
                      value={Polish || SideBox.open.payload.polish}
                      multiple
                      onChange={handleChangePolish}
                      helperText="Please select your Polish."

                    >
                      {polishCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='hinge'
                      label="Hinge"
                      value={Hinge || SideBox.open.payload.hinge}
                      multiple
                      onChange={handleChangeHinge}
                      helperText="Please select your hinge."

                    >
                      {hingeCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='knob'
                      label="Knob"
                      value={Knob || SideBox.open.payload.knob}
                      multiple
                      onChange={handleChangeKnob}
                      helperText="Please select your fitting."

                    >
                      {knobCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='door'
                      label="Door"
                      value={door || SideBox.open.payload.door}
                      multiple
                      onChange={handleChangeDoor}
                      helperText="Please select your fitting."

                    >
                      {doorCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='handle'
                      label="Handle"
                      value={handle || SideBox.open.payload.handle}
                      multiple
                      onChange={handleChangeHandle}
                      helperText="Please select your fitting."

                    >
                      {handleCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='weight_capacity'
                      label="Weight Capacity"
                      value={weightCap || SideBox.open.payload.weight_capacity}
                      multiple
                      onChange={handleChangeWeightCap}
                      helperText="Please select your fitting."

                    >
                      {weightCapCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='fitting'
                      label="Fitting"
                      value={fitting || SideBox.open.payload.fitting}
                      multiple
                      onChange={handleChangeFitting}
                      helperText="Please select your fitting."

                    >
                      {fittingCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>
                    {/* selling points  */}
                    <Editor
                      apiKey="nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                      initialValue="<p>Wirte some product disceription !!!</p>"
                      onInit={(event, editor) => sellingPoints.current = editor}
                      init={{
                        height: 300,
                        max_chars: 1000,
                        menubar: false,
                      }}

                    />


                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Top Size"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name="top_size"
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Dual Size"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name="dial_size"
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Seating Size Width"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name="seating_size_width"
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Seating Size Width Depth"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name="seating_size_depth"

                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Seating Size Height"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name="seating_size_height"
                    />


                    <br></br>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Wall Hanging</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"

                        name="wall_hanging"
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>

                    <br></br>

                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Assembly Required</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"

                        name="assembly_required"
                        onChange={hanleChangeAssembly}
                      >
                        <FormControlLabel value="shipping" control={<Radio />} label="Shipping In Part" />
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>


                    {assemblyVal === 'shipping' && <>

                      <br></br>
                      <TextField
                        fullWidth
                        autoComplete={false}
                        id="fullWidth"
                        label="Assemble Part"
                        type="number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">No. of parts</InputAdornment>,
                        }}
                        variant="outlined"
                        name="assembly_part"
                      />


                    </>}




                    <br></br>

                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Mirror</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"

                        name="mirror"
                        onChange={handleChangeMirror}

                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>

                    {mirrorVal !== 'no' && <>

                      <br></br>
                      <TextField
                        fullWidth
                        autoComplete={false}
                        id="fullWidth"
                        label="Mirror Lenth"
                        type="text"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                        }}
                        variant="outlined"
                        name="mirror_length"
                      />

                      <br></br>
                      <TextField
                        fullWidth
                        autoComplete={false}
                        id="fullWidth"
                        label="Mirror Width"
                        type="text"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                        }}
                        variant="outlined"
                        name="mirror_width"
                      />



                    </>}

                    <br></br>

                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Silver</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        onChange={handleChangeSilver}

                        name="silver"
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>


                    {
                      silver === 'yes' &&
                      <TextField
                        fullWidth
                        autoComplete={false}
                        id="fullWidth"
                        label="Sliver Weight"
                        type="text"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">Gram</InputAdornment>,
                        }}
                        variant="outlined"
                        name="silver_weight"
                      />

                    }


                    <br></br>

                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Wheel</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"

                        name="wheel"
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>

                    <br></br>

                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Joints</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="joints"
                      >
                        <FormControlLabel value="single" control={<Radio />} label="Single" />
                        <FormControlLabel value="multi" control={<Radio />} label="Multiple" />
                      </RadioGroup>
                    </FormControl>

                    <br></br>

                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Trolley</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"

                        name="trolley"
                      >
                        <FormControlLabel value="single" control={<Radio />} label="Single" />
                        <FormControlLabel value="multi" control={<Radio />} label="Multiple" />
                      </RadioGroup>
                    </FormControl>




                    <br></br>

                    {/* {Features} */}

                    <FormGroup>
                      <FormLabel id="demo-radio-buttons-group-label">Features</FormLabel>
                      <FormControlLabel control={<Checkbox name='rotating_seats' />} label="Rotating Seats" />
                      <FormControlLabel control={<Checkbox name='eatable_oil_polish' />} label="Eatable Oil Polished" />
                      <FormControlLabel control={<Checkbox name='no_chemical' />} label="No Chemical Used" />
                      <FormControlLabel control={<Checkbox name='lean_back' />} label="Lean Back" />
                      <FormControlLabel control={<Checkbox name='weaving' />} label="Weaving" />
                      <FormControlLabel control={<Checkbox name='not_suitable_for_Micro_Dish' />} label="Not Suitable For Microwave/Dishwasher" />
                      <FormControlLabel control={<Checkbox name='tilt_top' />} label="Tilt Top" />
                      <FormControlLabel control={<Checkbox name='indise_compartments' />} label="Inside Compartments" />
                      <FormControlLabel control={<Checkbox name='stackable' />} label="Stackable" />
                    </FormGroup>

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"

                      label="MRP"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                      }}
                      variant="outlined"
                      name="MRP"
                    />

                    <br></br>
                    <TextField
                      fullWidth

                      autoComplete={false}
                      id="fullWidth"
                      label="Selling Price"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                      }}
                      variant="outlined"
                      name="selling_price"
                    />

                    <br></br>
                    <TextField
                      fullWidth

                      autoComplete={false}
                      id="fullWidth"
                      label="Discount Limit"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }}
                      variant="outlined"
                      name='discount_limit'
                    />


                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='tax_rate'
                      label="Tax Rate"
                      value={taxRate || SideBox.open.payload.tax_rate}
                      multiple
                      onChange={handleChangeTaxRate}
                      helperText="Please select your tax rate."
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }}
                    >
                      {taxRateCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>


                    <br></br>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='dispatch_time'
                      label="Dispatch Time"
                      value={dispatchTime || SideBox.open.payload.dispatch_time}
                      multiple
                      onChange={handleChangeDispatchTime}
                      helperText="Please select your dispatch time"
                    >
                      {dispatchTimeCatalog.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>


                    <br></br>

                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Update Product
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}


            {/* update Products Ends */}

            {/*  add Catagory */}

            {SideBox.open.formType === "category" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Category
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your product category and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" onSubmit={handelCategory} id='myForm' enctype='multipart/form-data' method="post">

                    <ImagePreviews text={'Plese Drag and Drop the Category image'}> </ImagePreviews>

                    <TextField
                      fullWidth
                      required
                      id="outlined-select"

                      name='category_name'
                      label="Category"
                      type='text'

                      helperText="Please enter your category"
                    />




                    <br></br>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox name='category_status' />} label="Status (On/Off)" />

                    </FormGroup>


                    {/* <br></br>

                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      select
                      name='category_sub_name'
                      label="Sub Category"
                      value={subCat}
                      multiple
                      onChange={handleChangeSubCat}
                      helperText="Please select your sub category"
                    >
                      {subCategory.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField> */}
                    <br></br>

                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Add Category
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add Catagory Ends */}

            {/*  add primaryMeterial */}

            {SideBox.open.formType === "primaryMeterial" && (

              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Primary Material
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your Primary Material and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" onSubmit={handelPrimaryMaterial} id='myForm' enctype='multipart/form-data' method="post">

                    {/* <ImagePreviews text={'Plese Drag and Drop the Category image'}> </ImagePreviews> */}




                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      name='primaryMaterial_name'
                      label="Primary Material"
                      type='text'
                      helperText="Please enter your primary material"
                    />

                    <br></br>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox name='primaryMaterial_status' />} label="Status (On/Off)" />
                    </FormGroup>

                    <br></br>

                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Add Primary Material
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add primaryMeterial Ends */}

            {/*  update primaryMeterial */}

            {SideBox.open.formType === "update_PrimaryMaterial" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Primary Material
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update your Primary Material and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" id='myForm' onSubmit={handelUpdatePrimaryMaterial} enctype='multipart/form-data' method="post">
                    {/* <ImagePreviews text={'Plese Drag and Drop the Category image'}> </ImagePreviews> */}


                    <TextField
                      fullWidth
                      id="outlined-select"
                      name='primaryMaterial_name'
                      label="Primary Material"
                      helperText="Please enter the update"
                    />



                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Update Category
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* update primaryMeterial Ends */}


            {/*  add Polish Meterial */}

            {SideBox.open.formType === "addPolish" && (

              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Polish
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your Polish and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" onSubmit={handelPolish} id='myForm' enctype='multipart/form-data' method="post">

                    {/* <ImagePreviews text={'Plese Drag and Drop the Category image'}> </ImagePreviews> */}




                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      name='polish_name'
                      label="Polish Name"
                      type='text'
                      helperText="Please enter your primary material"
                    />

                    <br></br>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox name='polish_status' />} label="Status (On/Off)" />
                    </FormGroup>

                    <br></br>

                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Add Polish
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add addPolish  Ends */}

            {/*  update Polish  */}

            {SideBox.open.formType === "update_polish" && (

              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Polish
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update Polish and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" onSubmit={handelUpdatePolish} id='myForm' enctype='multipart/form-data' method="post">

                    {/* <ImagePreviews text={'Plese Drag and Drop the Category image'}> </ImagePreviews> */}




                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      name='polish_name'
                      label="Polish Name"
                      type='text'
                      helperText="Please enter your primary material"
                    />

                    {/* <br></br>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox name='polish_status' />} label="Status (On/Off)" />
                    </FormGroup> */}

                    <br></br>

                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Update Polish
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add addPolish  Ends */}


            {/*  add secondary Meterial */}

            {SideBox.open.formType === "secondaryMaterial" && (

              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Primary Material
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your Primary Material and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" onSubmit={handelSecondaryMaterial} id='myForm' enctype='multipart/form-data' method="post">

                    {/* <ImagePreviews text={'Plese Drag and Drop the Category image'}> </ImagePreviews> */}




                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      name='secondaryMaterial_name'
                      label="Secondary Material"
                      type='text'
                      helperText="Please enter your primary material"
                    />

                    <br></br>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox name='secondaryMaterial_status' />} label="Status (On/Off)" />
                    </FormGroup>

                    <br></br>

                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Add Primary Material
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add secondary Meterial Ends */}

            {/*  update secondaryMaterial */}

            {SideBox.open.formType === "update_secondaryMaterial" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Secondary Material
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update your Secondary Material and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" id='myForm' onSubmit={handelUpdateSecondaryMaterial} enctype='multipart/form-data' method="post">
                    {/* <ImagePreviews text={'Plese Drag and Drop the Category image'}> </ImagePreviews> */}


                    <TextField
                      fullWidth
                      id="outlined-select"
                      name='secondaryMaterial_name'
                      label="Secondary Material"
                      helperText="Please enter the update"
                    />



                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Update SecondaryMaterial
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* update secondaryMaterial Ends */}



            {/*  add subCatagory */}

            {SideBox.open.formType === "subcategory" && (

              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Sub Category
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your sub category and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" onSubmit={handelSubCategories} id='myForm' enctype='multipart/form-data' method="post">

                    {/* <ImagePreviews text={'Plese Drag and Drop the Category image'}> </ImagePreviews> */}


                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      select
                      name='category_id'
                      label="Category"
                      value={cat}
                      multiple
                      onChange={handleChange}
                      helperText="Please select your category"
                    >
                      {category.map((option) => (
                        option.category_status &&
                        <MenuItem key={option._id} value={option._id}>
                          {option.category_name}
                        </MenuItem>

                      ))

                      }

                    </TextField>

                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      name='sub_category_name'
                      label="Sub Category"
                      type='text'
                      helperText="Please enter your sub category"
                    />

                    <br></br>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox name='sub_category_status' />} label="Status (On/Off)" />
                    </FormGroup>

                    <br></br>

                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Add Sub Category
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add sebCatagory Ends */}



            {/*update subCatagory */}

            {SideBox.open.formType === "update_Subcategory" && (

              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Sub Category
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your update sub category and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" onSubmit={handelUpdateSubCategories} id='myForm' enctype='multipart/form-data' method="post">

                    {/* <ImagePreviews text={'Plese Drag and Drop the Category image'}> </ImagePreviews> */}


                    <TextField
                      fullWidth

                      id="outlined-select"
                      select
                      name='category_id'
                      label="Category"
                      value={cat}
                      multiple
                      onChange={handleChange}
                      helperText="Please select your category"
                    >
                      {category.map((option) => (
                        option.category_status &&
                        <MenuItem key={option._id} value={option._id}>
                          {option.category_name}
                        </MenuItem>

                      ))

                      }

                    </TextField>

                    <TextField
                      fullWidth

                      id="outlined-select"
                      name='sub_category_name'
                      label="Sub Category"
                      type='text'
                      helperText="Please enter your sub category"
                    />

                    <br></br>


                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Add Sub Category
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* update sebCatagory Ends */}

            {/*  update Catagory */}

            {SideBox.open.formType === "update_category" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Category
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update your product category and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" id='myForm' onSubmit={handelUpdateCategory} enctype='multipart/form-data' method="post">
                    <ImagePreviews text={'Plese Drag and Drop the Category image'}> </ImagePreviews>


                    <TextField
                      fullWidth

                      id="outlined-select"

                      name='category_name'
                      label="Category"
                      helperText="Please enter the update"
                    />



                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Update Category
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* update Catagory Ends */}

            {/* Ore Staff */}

            {SideBox.open.formType === "staff" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Staff
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your staff necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" id='myForm' action="" method="post">
                    <section className="dorpContainer">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <p>
                          Drag & drop your staff image here, or click to select
                          image
                        </p>
                        <em>(Only *.jpeg and *.png images will be accepted)</em>
                      </div>
                      <aside>
                        <h5>File Name</h5>
                        <ul>{acceptedFileItems}</ul>
                      </aside>
                    </section>

                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Staff Name"
                      type="textl"
                      variant="outlined"
                    />

                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Email"
                      type="email"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Password"
                      type="password"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Phone Number"
                      type="number"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label=""
                      type="date"
                      variant="outlined"
                    />

                    <TextField
                      fullWidth
                      id="outlined-select"
                      select
                      label="Staff Role"
                      value={cat}
                      multiple
                      onChange={handleChange}
                      helperText="Please select the staff role"
                    >
                      {post.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>

                    <Button color="primary" fullWidth variant="contained">
                      Add Staff
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* Ore Staff Ends */}

            {/* Coupone  */}
            {SideBox.open.formType === 'coupone' &&

              (<Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Coupone
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your coupone and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" action="" id='myForm' method="post">
                    <section className="dorpContainer">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <p>
                          Drag & drop your banner image here, or click to select
                          image
                        </p>
                        <em>(Only *.jpeg and *.png images will be accepted)</em>
                      </div>
                      <aside>
                        <h5>File Name</h5>
                        <ul>{acceptedFileItems}</ul>
                      </aside>
                    </section>

                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Campaign Name"
                      type="textl"
                      variant="outlined"
                    />

                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Couponse Code"
                      type="text"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Discount Percentage"
                      type="number"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Minimum Amount "
                      type="number"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label=""
                      type="date"
                      variant="outlined"
                    />

                    <TextField
                      fullWidth
                      id="outlined-select"
                      select
                      label="Product Type"
                      value={cat}
                      multiple
                      onChange={handleChange}
                      helperText="Please select the product type"
                    >
                      {category.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>

                    <Button color="primary" fullWidth variant="contained">
                      Add Coupone
                    </Button>
                  </form>
                </Grid>
              </Grid>)

            }
            {/* Coupone Ends */}
          </Box>
        </Backdrop>
      </Slide>
    </>
  );
};

export default Sideform;
