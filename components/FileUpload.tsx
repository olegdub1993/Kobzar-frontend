import React, {  useRef } from 'react'

interface FileUploadProps {
    setFile: Function
    accept: string
    children:React.ReactNode
}

const FileUpload: React.FC<FileUploadProps> = ({setFile, accept ,children}) => {
    const ref = useRef<HTMLInputElement>(null)
    
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
        setFile(e.target.files[0])
        }
    }
    return (
        <div onClick={()=>ref.current?.click()}>
            <input ref={ref} onChange={onChange} type={"file"} accept={accept} style={{ display: "none" }} />
            {children}
        </div>
    )
}

export default FileUpload