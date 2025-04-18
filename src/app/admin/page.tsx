"use client";
import { useRef, useState, useEffect } from "react";
import { fetcher } from "../../../utils/fetcher";

export default function Admin() {
  const modal_new_service = useRef<HTMLDialogElement>(null);
  const [items, setItems] = useState<any[]>([]);
  const [list_service, setList_service] = useState<any[]>([]);
  const [service_name, setService_name] = useState("");
  const [service_description, setService_description] = useState("");
  const [provider, setProvider] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [refresh, setRefresh] = useState(false);

  const addItem = () => {
    setItems([...items, { name: "3 Ngày", day: "3", price: "50000" }]);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleChangeName = (key: number, value: string) => {
    items.map((item, index) => {
      if (index === key) {
        item.name = value;
      }
    });
    setItems(items);
  };

  const handleChangeDay = (key: number, value: string) => {
    items.map((item, index) => {
      if (index === key) {
        item.day = value;
      }
    });
    setItems(items);
  };

  const handleChangePrice = (key: number, value: string) => {
    items.map((item, index) => {
      if (index === key) {
        item.price = value;
      }
    });
    setItems(items);
  };

  const saveService = async () => {
    const payLoad = {
      service_name: service_name,
      service_description: service_description,
      provider: provider,
      category_id: category_id,
      items: items,
    };
    await fetcher("http://localhost:3333/service/create", "POST", payLoad);
    modal_new_service.current?.close();
    setRefresh(!refresh);
  };

  const getService = async () => {
    const response = await fetcher("http://localhost:3333/service/get");
    if (!response) return;
    setList_service(response.data);
  };

  useEffect(() => {
    getService();
  }, [refresh]);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl">Quản lý dịch vụ</h1>
        <button
          className="btn"
          onClick={() => {
            modal_new_service.current?.showModal();
          }}
        >
          Thêm dịch vụ
        </button>
      </div>
      <dialog ref={modal_new_service} className="modal">
        <div className="modal-box">
          <h2 className="font-medium text-xl mb-3">Thêm mới dịch vụ</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Tên dịch vụ:</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Nhập tên dịch vụ"
              onChange={(e) => setService_name(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Mô tả dịch vụ:</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Nhập mô tả"
              onChange={(e) => setService_description(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Thương hiệu:</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Nhập thương hiệu"
              onChange={(e) => setProvider(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Chọn danh mục:</legend>
            <select
              defaultValue="Danh mục"
              className="select w-full"
              onChange={(e) => {
                setCategory_id(e.target.value);
              }}
            >
              <option value="" disabled={true}>
                Danh mục
              </option>
              <option value="1">Giải trí</option>
              <option value="2">Giao thông</option>
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Giá dịch vụ:</legend>
            {items.map((item, index) => (
              <div className="flex gap-3 mb-2" key={index}>
                <input
                  type="text"
                  className="input"
                  placeholder="Tên dịch vụ"
                  defaultValue={item.name}
                  onChange={(e) => handleChangeName(index, e.target.value)}
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Ngày cho thuê"
                  defaultValue={item.day}
                  onChange={(e) => handleChangeDay(index, e.target.value)}
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Giá"
                  defaultValue={item.price}
                  onChange={(e) => handleChangePrice(index, e.target.value)}
                />
                <button
                  className="btn btn-dash btn-error"
                  onClick={() => removeItem(index)}
                >
                  Xóa
                </button>
              </div>
            ))}
            <button className="btn btn-dash w-full" onClick={addItem}>
              Thêm giá dịch vụ
            </button>
          </fieldset>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={saveService}>
              Lưu mới
            </button>
            <button
              className="btn btn-error"
              onClick={() => {
                modal_new_service.current?.close();
              }}
            >
              Huỷ bỏ
            </button>
          </div>
        </div>
      </dialog>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Dịch vụ</th>
              <th>Mô tả</th>
              <th>Thương hiệu</th>
              <th>Giá thuê</th>
            </tr>
          </thead>
          <tbody>
            {list_service.map((item, index) => (
              <tr key={index}>
                <td>{item.service_name}</td>
                <td>{item.service_description}</td>
                <td>{item.provider}</td>
                <td>
                  {item.pricing.map((i: any, k: any) => (
                    <p key={k}>
                      {i.option_name} - {i.price}
                    </p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
