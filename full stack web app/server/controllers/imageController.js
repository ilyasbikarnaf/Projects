exports.uploadImage = (req, res) => {
  res.status(201).json({ status: "success", data: { image: req.files } });
};


