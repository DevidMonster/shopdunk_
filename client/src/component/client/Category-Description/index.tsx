type IProps = {
  description: string;
}

const Description = ({ description }: IProps) => {
  return (
    <div className="border rounded-xl pt-10 pb-5 px-10 bg-white" dangerouslySetInnerHTML={{ __html: description }}>
      
    </div>
  );
};

export default Description;
